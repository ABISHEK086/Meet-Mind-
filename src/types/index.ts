export type Priority = 'high' | 'medium' | 'low'

export interface ActionItem {
  id: string
  task: string
  owner: string
  priority: Priority
  dueDate: string | null
  done: boolean
}

export interface TranscriptLine {
  speaker: string
  text: string
  timestamp: string
}

export interface MeetingResult {
  summary: string
  decisions: string[]
  actions: ActionItem[]
  transcript: TranscriptLine[]
  rawTranscript: string
}
