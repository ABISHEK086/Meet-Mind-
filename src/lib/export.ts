import jsPDF from 'jspdf'
import type { MeetingResult } from '@/types'

export function toMarkdown(result: MeetingResult): string {
  const lines: string[] = []
  lines.push('# Meeting Summary', '')
  lines.push(result.summary, '')
  lines.push('## Decisions')
  result.decisions.forEach((d) => lines.push(`- ${d}`))
  lines.push('', '## Action Items')
  result.actions.forEach((a) => {
    const box = a.done ? '[x]' : '[ ]'
    const due = a.dueDate ? `, Due: ${a.dueDate}` : ''
    lines.push(`- ${box} ${a.task} (Owner: ${a.owner}, Priority: ${a.priority}${due})`)
  })
  return lines.join('\n')
}

export async function copyMarkdown(result: MeetingResult): Promise<void> {
  await navigator.clipboard.writeText(toMarkdown(result))
}

export function downloadPDF(result: MeetingResult): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const margin = 48
  let y = margin
  const lineHeight = 16
  const pageHeight = doc.internal.pageSize.getHeight()

  function ensureSpace(extra = lineHeight) {
    if (y + extra > pageHeight - margin) {
      doc.addPage()
      y = margin
    }
  }

  function heading(text: string, size = 16) {
    ensureSpace(size + 8)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(size)
    doc.text(text, margin, y)
    y += size + 10
  }

  function paragraph(text: string) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    const wrapped = doc.splitTextToSize(text, 595 - margin * 2 - 48)
    wrapped.forEach((line: string) => {
      ensureSpace()
      doc.text(line, margin, y)
      y += lineHeight
    })
    y += 6
  }

  function bullet(text: string) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    const wrapped = doc.splitTextToSize(`•  ${text}`, 595 - margin * 2 - 48)
    wrapped.forEach((line: string) => {
      ensureSpace()
      doc.text(line, margin + 8, y)
      y += lineHeight
    })
  }

  heading('MeetMind — Meeting Summary', 20)
  paragraph(result.summary)

  heading('Decisions', 14)
  result.decisions.forEach((d) => bullet(d))
  y += 10

  heading('Action Items', 14)
  result.actions.forEach((a) => {
    const status = a.done ? '[Done]' : '[Open]'
    const due = a.dueDate ? ` · Due ${a.dueDate}` : ''
    bullet(`${status} ${a.task} — ${a.owner} · ${a.priority.toUpperCase()}${due}`)
  })

  doc.save('meetmind-summary.pdf')
}

export function buildShareLink(result: MeetingResult): string {
  const payload = btoa(encodeURIComponent(JSON.stringify(result)))
  const url = new URL(window.location.href)
  url.pathname = '/results'
  url.searchParams.set('data', payload)
  return url.toString()
}

export function decodeShareLink(data: string): MeetingResult | null {
  try {
    return JSON.parse(decodeURIComponent(atob(data)))
  } catch {
    return null
  }
}
