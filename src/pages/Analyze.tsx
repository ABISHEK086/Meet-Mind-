import { useState, useMemo, useCallback, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Mic, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { FileUpload, type FileUploadItem } from '@/components/ui/file-upload'
import { useMeeting } from '@/store/MeetingContext'
import { transcribeAudio, hasGroqKey } from '@/lib/groq'

const SAMPLE = `[00:00] Priya: Let's kick off — first item is the v2 launch date.
[00:14] Marcus: I think we should target next Friday, but the contract with Acme still needs to go out.
[00:29] Priya: Agreed, we'll go with Friday as the final call. Marcus, can you send the updated contract by tomorrow?
[00:41] Marcus: Yes, I'll send it tomorrow, marking it urgent since legal needs a few days.
[00:55] Dana: For the offsite, I still need to book the venue. No rush, I'll do it next week.
[01:10] Priya: Sounds good. Also, we decided to move the design review to Thursdays going forward.
[01:22] Dana: I'll update the calendar invite today, that one's asap since people need notice.`

export function Analyze() {
  const [params] = useSearchParams()
  const [tab, setTab] = useState(params.get('tab') === 'audio' ? 'audio' : 'text')
  const [text, setText] = useState('')
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [uploadItems, setUploadItems] = useState<FileUploadItem[]>([])
  const [transcribing, setTranscribing] = useState(false)
  const timersRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map())
  const navigate = useNavigate()
  const { analyze, loading, error } = useMeeting()

  const charCount = text.length
  const canSubmit = useMemo(() => (tab === 'text' ? text.trim().length > 20 : !!audioFile), [tab, text, audioFile])

  const stopUpload = useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (!timer) return
    clearInterval(timer)
    timersRef.current.delete(id)
  }, [])

  const startUpload = useCallback(
    (item: FileUploadItem) => {
      stopUpload(item.id)
      const timer = setInterval(() => {
        setUploadItems((current) => {
          const target = current.find((i) => i.id === item.id)
          if (!target || target.status !== 'uploading') {
            stopUpload(item.id)
            return current
          }
          const nextProgress = Math.min(100, (target.progress ?? 0) + 15 + Math.random() * 20)
          if (nextProgress >= 100) {
            stopUpload(item.id)
            if (item.file) setAudioFile(item.file)
          }
          return current.map((i) => (i.id === item.id ? { ...i, progress: nextProgress, status: nextProgress >= 100 ? 'success' : 'uploading' } : i))
        })
      }, 180)
      timersRef.current.set(item.id, timer)
    },
    [stopUpload]
  )

  async function handleAnalyze() {
    let transcript = text
    if (tab === 'audio' && audioFile) {
      if (hasGroqKey) {
        setTranscribing(true)
        try {
          transcript = await transcribeAudio(audioFile)
        } finally {
          setTranscribing(false)
        }
      } else {
        transcript = SAMPLE
      }
    }
    await analyze(transcript)
    navigate('/results')
  }

  const busy = loading || transcribing

  return (
    <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-2xl flex-col items-center justify-center px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
        <Card glow="violet" className="p-6 sm:p-8">
          <h1 className="mb-1 font-display text-xl font-bold text-ink">Analyze a meeting</h1>
          <p className="mb-6 text-sm text-ink-500">Paste a transcript or drop in a recording to get started.</p>

          <Tabs
            tabs={[
              {
                id: 'text',
                label: (
                  <span className="flex items-center justify-center gap-1.5">
                    <FileText className="h-4 w-4" /> Paste text
                  </span>
                ),
              },
              {
                id: 'audio',
                label: (
                  <span className="flex items-center justify-center gap-1.5">
                    <Mic className="h-4 w-4" /> Upload audio
                  </span>
                ),
              },
            ]}
            active={tab}
            onChange={setTab}
          />

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {tab === 'text' ? (
                <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste your meeting transcript here…"
                      rows={10}
                      className="surface-sunk w-full resize-none rounded-xl p-4 text-sm text-ink placeholder:text-ink-300 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(91,108,246,0.12)]"
                    />
                    <span className="absolute bottom-3 right-4 text-xs text-ink-300">{charCount} chars</span>
                  </div>
                  <button onClick={() => setText(SAMPLE)} className="mt-2 text-xs text-accent hover:underline">
                    Use a sample transcript
                  </button>
                </motion.div>
              ) : (
                <motion.div key="audio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <FileUpload
                    variant="centered"
                    accept="audio/*"
                    multiple={false}
                    maxFiles={1}
                    value={uploadItems}
                    onValueChange={setUploadItems}
                    onFilesAdded={(added) => {
                      for (const item of added) startUpload(item)
                    }}
                    onRetry={(item) => startUpload(item)}
                    onRemove={(item) => {
                      stopUpload(item.id)
                      setAudioFile(null)
                    }}
                    title="Drop your recording here"
                    description="MP3, WAV, M4A · up to 25MB"
                    browseLabel="Browse"
                  />
                  {!hasGroqKey && (
                    <p className="mt-2 text-xs text-ink-300">
                      Demo mode: no Groq API key is configured, so a sample transcript will be analyzed instead of the actual audio.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && <p className="mt-4 text-sm text-high">{error}</p>}

          <Button onClick={handleAnalyze} disabled={!canSubmit || busy} className="mt-6 w-full">
            {busy ? (
              'Analyzing…'
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Analyze meeting
              </>
            )}
          </Button>
        </Card>
      </motion.div>
    </div>
  )
}