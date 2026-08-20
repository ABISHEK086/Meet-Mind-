import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, FileDown, Link2 } from 'lucide-react'
import { useMeeting } from '@/store/MeetingContext'
import { ExportCard } from '@/components/export/ExportCard'
import { MarkdownPreview } from '@/components/export/MarkdownPreview'
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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-center font-display text-2xl font-bold text-ink">Export your meeting</h1>
        <p className="mt-2 text-center text-sm text-ink-500">Choose the format that fits your workflow.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <ExportCard
            icon={<FileText className="h-6 w-6 text-accent" />}
            title="Copy Markdown"
            description="Checklist-formatted, ready to paste into Notion, Slack, or GitHub."
            actionLabel="Copy to clipboard"
            onAction={() => copyMarkdown(result)}
            glow="violet"
          />
          <ExportCard
            icon={<FileDown className="h-6 w-6 text-coral" />}
            title="Download PDF"
            description="A clean, printable summary with decisions and action items."
            actionLabel="Download PDF"
            onAction={() => downloadPDF(result)}
            glow="magenta"
          />
          <ExportCard
            icon={<Link2 className="h-6 w-6 text-teal" />}
            title="Share link"
            description="A read-only link that encodes this meeting's results."
            actionLabel="Copy share link"
            onAction={async () => {
              const link = buildShareLink(result)
              await navigator.clipboard.writeText(link)
              setCopiedLink(link)
            }}
            glow="cyan"
          />
        </div>

        <MarkdownPreview result={result} markdown={toMarkdown(result)} />

        {copiedLink && (
          <p className="mt-4 truncate text-center text-xs text-ink-300">Copied: {copiedLink}</p>
        )}
      </motion.div>
    </div>
  )
}