import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMeeting } from '@/store/MeetingContext'
import { ExportCard } from '@/components/export/ExportCard'
import { toMarkdown, copyMarkdown, downloadPDF, buildShareLink } from '@/lib/export'

export function Export() {
  const { result } = useMeeting()
  const navigate = useNavigate()
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  if (!result) {
    navigate('/analyze')
    return null
  }

  return (
    <div className="mx-auto max-w-5xl bg-bg px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-center font-display text-2xl font-bold text-ink">Export your meeting</h1>
        <p className="mt-2 text-center text-sm text-ink-500">Choose the format that fits your workflow.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <ExportCard
            icon="📄"
            title="Copy Markdown"
            description="Checklist-formatted, ready to paste into Notion, Slack, or GitHub."
            actionLabel="Copy to clipboard"
            onAction={() => copyMarkdown(result)}
            tint="lavender"
          />
          <ExportCard
            icon="🧾"
            title="Download PDF"
            description="A clean, printable summary with decisions and action items."
            actionLabel="Download PDF"
            onAction={() => downloadPDF(result)}
            tint="mint"
          />
          <ExportCard
            icon="🔗"
            title="Share link"
            description="A read-only link that encodes this meeting's results."
            actionLabel="Copy share link"
            onAction={async () => {
              const link = buildShareLink(result)
              await navigator.clipboard.writeText(link)
              setCopiedLink(link)
            }}
            tint="lavender"
          />
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-surface p-6">
          <h2 className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-ink-500">Markdown preview</h2>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink-700">
            {toMarkdown(result)}
          </pre>
        </div>

        {copiedLink && (
          <p className="mt-4 truncate text-center text-xs text-ink-300">Copied: {copiedLink}</p>
        )}
      </motion.div>
    </div>
  )
}