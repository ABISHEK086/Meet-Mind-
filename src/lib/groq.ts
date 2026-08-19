import Groq from 'groq-sdk'
import type { MeetingResult, TranscriptLine, ActionItem, Priority } from '@/types'

const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined

const groq = apiKey
  ? new Groq({ apiKey, dangerouslyAllowBrowser: true })
  : null

export const hasGroqKey = Boolean(apiKey)

/**
 * Transcribes an audio file using Groq's hosted Whisper Large v3.
 * Requires VITE_GROQ_API_KEY to be set — throws otherwise so the
 * caller can fall back to demo mode.
 */
export async function transcribeAudio(file: File): Promise<string> {
  if (!groq) throw new Error('No Groq API key configured')
  const transcription = await groq.audio.transcriptions.create({
    file,
    model: 'whisper-large-v3',
    response_format: 'verbose_json',
    timestamp_granularities: ['word'],
  })
  return transcription.text
}

const SYSTEM_PROMPT = `You are a meeting intelligence assistant. Extract action items from the transcript and return ONLY valid JSON in this exact format, with no preamble or markdown fences:
{
  "summary": "2-3 sentence meeting summary",
  "decisions": ["decision 1", "decision 2"],
  "actions": [
    { "id": "1", "task": "task description", "owner": "person name or Unknown", "priority": "high | medium | low", "dueDate": "mentioned date or null" }
  ]
}`

interface ExtractedPayload {
  summary: string
  decisions: string[]
  actions: Array<{
    id: string
    task: string
    owner: string
    priority: Priority
    dueDate: string | null
  }>
}

async function extractActionsLive(transcript: string): Promise<ExtractedPayload> {
  if (!groq) throw new Error('No Groq API key configured')
  const response = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: transcript },
    ],
    temperature: 0.1,
  })
  const content = response.choices[0].message.content ?? '{}'
  const cleaned = content.replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned)
}

/** Lightweight heuristic extractor used when no API key is present, so the product is fully demoable. */
function extractActionsDemo(transcript: string): ExtractedPayload {
  const lines = transcript.split('\n').map((l) => l.trim()).filter(Boolean)
  const actions: ExtractedPayload['actions'] = []
  const decisions: string[] = []
  let idx = 1

  const verbCue = /\b(will|should|needs? to|going to|let's|has to|must|to do|action item)\b/i
  const decisionCue = /\b(decided|agreed|we'll go with|final call|approved)\b/i

  for (const raw of lines) {
    const line = raw.replace(/^\[?\d{1,2}:\d{2}\]?\s*/, '')
    const speakerMatch = line.match(/^([A-Za-z][\w .'-]{1,24}):\s*(.*)$/)
    const body = speakerMatch ? speakerMatch[2] : line
    const speaker = speakerMatch ? speakerMatch[1] : 'Unknown'
    if (!body) continue

    if (decisionCue.test(body)) {
      decisions.push(body.trim())
    }
    if (verbCue.test(body) && body.length > 12) {
      const priority: Priority = /\basap|urgent|today|by tomorrow|critical\b/i.test(body)
        ? 'high'
        : /\bnext week|no rush|whenever|eventually\b/i.test(body)
        ? 'low'
        : 'medium'
      const dueMatch = body.match(/\b(by [A-Za-z0-9 ]+?|tomorrow|next week|today|EOD|end of day)\b/i)
      actions.push({
        id: String(idx++),
        task: body.trim().replace(/\.$/, ''),
        owner: speaker,
        priority,
        dueDate: dueMatch ? dueMatch[0] : null,
      })
    }
  }

  const summary = lines.length
    ? `Meeting covered ${lines.length} discussion points across ${new Set(
        lines.map((l) => l.match(/^([A-Za-z][\w .'-]{1,24}):/)?.[1]).filter(Boolean)
      ).size || 1} speakers, producing ${actions.length} action item${actions.length === 1 ? '' : 's'}.`
    : 'No transcript content was provided.'

  return {
    summary,
    decisions: decisions.length ? decisions.slice(0, 5) : ['No explicit decisions were flagged in this transcript.'],
    actions: actions.length
      ? actions.slice(0, 12)
      : [
          {
            id: '1',
            task: 'Review this transcript and add action items manually',
            owner: 'Unknown',
            priority: 'medium',
            dueDate: null,
          },
        ],
  }
}

export function parseTranscriptLines(transcript: string): TranscriptLine[] {
  const lines = transcript.split('\n').map((l) => l.trim()).filter(Boolean)
  return lines.map((raw, i) => {
    const tsMatch = raw.match(/^\[?(\d{1,2}:\d{2})\]?\s*/)
    const withoutTs = raw.replace(/^\[?\d{1,2}:\d{2}\]?\s*/, '')
    const speakerMatch = withoutTs.match(/^([A-Za-z][\w .'-]{1,24}):\s*(.*)$/)
    return {
      timestamp: tsMatch ? tsMatch[1] : formatSeconds(i * 18),
      speaker: speakerMatch ? speakerMatch[1] : 'Speaker',
      text: speakerMatch ? speakerMatch[2] : withoutTs,
    }
  })
}

function formatSeconds(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export async function analyzeMeeting(rawTranscript: string): Promise<MeetingResult> {
  const payload = groq ? await extractActionsLive(rawTranscript) : extractActionsDemo(rawTranscript)
  const actions: ActionItem[] = payload.actions.map((a) => ({ ...a, done: false, dueDate: a.dueDate }))
  return {
    summary: payload.summary,
    decisions: payload.decisions,
    actions,
    transcript: parseTranscriptLines(rawTranscript),
    rawTranscript,
  }
}
