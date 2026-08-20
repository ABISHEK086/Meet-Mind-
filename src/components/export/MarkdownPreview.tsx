import { useState } from 'react'
import { Copy, Check, FileText, ListChecks } from 'lucide-react'
import type { MeetingResult } from '@/types'

function RawLine({ line }: { line: string }) {
  if (line.startsWith('## ')) {
    return <div className="mb-1 mt-3 font-semibold text-accent">{line}</div>
  }
  if (line.startsWith('# ')) {
    return <div className="mb-1 font-semibold text-ink">{line}</div>
  }
  if (line.startsWith('- [x]')) {
    return <div className="text-low">{line}</div>
  }
  if (line.startsWith('- [ ]')) {
    return <div className="text-ink-700">{line}</div>
  }
  if (line.startsWith('- ')) {
    return <div className="text-teal">{line}</div>
  }
  if (line.trim() === '') {
    return <div className="h-3" />
  }
  return <div className="text-ink-500">{line}</div>
}

interface MarkdownPreviewProps {
  result: MeetingResult
  markdown: string
}

export function MarkdownPreview({ result, markdown }: MarkdownPreviewProps) {
  const [mode, setMode] = useState<'preview' | 'raw'>('preview')
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="surface mt-12 overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <div className="flex items-center gap-1 rounded-full bg-surface-sunk p-0.5">
          <button
            onClick={() => setMode('preview')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              mode === 'preview' ? 'bg-white text-ink shadow-[0_1px_2px_rgba(20,16,14,0.08)]' : 'text-ink-500 hover:text-ink'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setMode('raw')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              mode === 'raw' ? 'bg-white text-ink shadow-[0_1px_2px_rgba(20,16,14,0.08)]' : 'text-ink-500 hover:text-ink'
            }`}
          >
            Raw
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-ink-500 transition-colors hover:text-ink"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-low" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="max-h-72 overflow-auto p-5">
        {mode === 'preview' ? (
          <div className="space-y-5">
            <div>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                <FileText className="h-3.5 w-3.5 text-accent" /> Meeting Summary
              </h4>
              <p className="text-sm leading-relaxed text-ink-700">{result.summary}</p>
            </div>

            {result.decisions.length > 0 && (
              <div>
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-teal">Decisions</h4>
                <div className="space-y-1">
                  {result.decisions.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-ink-700">
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                <ListChecks className="h-3.5 w-3.5" /> Action Items
              </h4>
              <div className="space-y-1.5">
                {result.actions.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 text-sm">
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        a.done ? 'border-low bg-low text-white' : 'border-line-strong'
                      }`}
                    >
                      {a.done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                    </span>
                    <span className={a.done ? 'text-ink-300 line-through' : 'text-ink-700'}>
                      {a.task} <span className="text-ink-300">· {a.owner}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
            {markdown.split('\n').map((line, i) => (
              <RawLine key={i} line={line} />
            ))}
          </pre>
        )}
      </div>
    </div>
  )
}