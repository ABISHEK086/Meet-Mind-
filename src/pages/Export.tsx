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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-center font-display text-xl font-bold text-ink sm:text-2xl">Export your meeting</h1>
        <p className="mt-2 text-center text-sm text-ink-500">Choose the format that fits your workflow.</p>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
          <ExportCard
            icon={<FileText className="h-6 w-6" />}
            title="Copy Markdown"
            description="Checklist-formatted, ready to paste into Notion, Slack, or GitHub."
            actionLabel="Copy to clipboard"
            onAction={() => copyMarkdown(result)}
            glow="violet"
            tone="accent"
            formatTag=".md"
            delay={0}
          />
          <ExportCard
            icon={<FileDown className="h-6 w-6" />}
            title="Download PDF"
            description="A clean, printable summary with decisions and action items."
            actionLabel="Download PDF"
            onAction={() => downloadPDF(result)}
            glow="magenta"
            tone="coral"
            formatTag=".pdf"
            delay={0.08}
          />
          <ExportCard
            icon={<Link2 className="h-6 w-6" />}
            title="Share link"
            description="A read-only link that encodes this meeting's results."
            actionLabel="Copy share link"
            onAction={async () => {
              const link = buildShareLink(result)
              await navigator.clipboard.writeText(link)
              setCopiedLink(link)
            }}
            glow="cyan"
            tone="teal"
            formatTag="URL"
            delay={0.16}
          />
        </div>

        {/* overflow-x-auto guards against MarkdownPreview's code block being wider than the phone */}
        <div className="overflow-x-auto">
          <MarkdownPreview result={result} markdown={toMarkdown(result)} />
        </div>

        {copiedLink && (
          <p className="mt-4 truncate text-center text-xs text-ink-300">Copied: {copiedLink}</p>
        )}
      </motion.div>
    </div>
  )
}