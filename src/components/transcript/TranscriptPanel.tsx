import type { TranscriptLine } from '@/types'

const speakerColors = ['text-violet', 'text-cyan', 'text-medium', 'text-magenta']

function colorFor(speaker: string) {
  let hash = 0
  for (let i = 0; i < speaker.length; i++) hash = (hash + speaker.charCodeAt(i)) % speakerColors.length
  return speakerColors[hash]
}

export function TranscriptPanel({ lines }: { lines: TranscriptLine[] }) {
  return (
    <div className="space-y-4 font-mono text-sm leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="flex gap-3">
          <span className="mt-0.5 shrink-0 text-[11px] text-ink-faint">{line.timestamp}</span>
          <div>
            <span className={`mr-2 font-semibold ${colorFor(line.speaker)}`}>{line.speaker}</span>
            <span className="text-ink-dim">{line.text}</span>
          </div>
        </div>
      ))}
    </div>
  )
}