# MeetMind

Turn any meeting into structured action — instantly.

Paste a transcript or drop in an audio recording, and MeetMind pulls out a
summary, key decisions, and action items (owner, priority, due date) that you
can edit, reorder, and export.

## Stack

- **React 19 + TypeScript + Vite** (a Vite SPA was used instead of Next.js —
  there's no need for server rendering or API routes here, since the only
  external calls are client-side to Groq, and Vite keeps the dev loop fast.
  If you later add server-side features — saved meetings, auth, a shared
  team workspace — migrating to Next.js's app router is a reasonable next
  step; the component structure below will carry over largely unchanged.)
- **Tailwind CSS v4** for styling (via `@tailwindcss/vite`, tokens live in `src/index.css`)
- **Framer Motion** for all animation (staggered cards, swipe gestures, tab pills, waveform)
- **React Router** for the four screens
- **Groq SDK** for transcription (Whisper Large v3) and extraction (Llama 3.1)
- **jsPDF** for the PDF export
- **react-dropzone** for the audio upload zone

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

### Using real transcription & extraction

By default there's no API key configured, so MeetMind runs in **demo mode**:
pasted text is analyzed with a local heuristic extractor, and audio uploads
fall back to a bundled sample transcript. To use the real Groq-powered
pipeline described in the original spec:

1. Get a free key at https://console.groq.com
2. Put it in `.env` as `VITE_GROQ_API_KEY=your-key-here`
3. Restart the dev server

With a key set, audio is transcribed with `whisper-large-v3` and both text
and audio transcripts are analyzed with `llama-3.1-8b-instant`.

> Note: the app calls the Groq API directly from the browser
> (`dangerouslyAllowBrowser: true`), matching the original spec. That's fine
> for a personal/demo build, but exposes your API key in client code — for
> a real production deployment, proxy these calls through a small backend
> (a Next.js API route or a serverless function) instead.

## Project structure

```
src/
├── components/
│   ├── ui/          Button, Badge, Card, Tabs, Waveform, AudioDropzone
│   ├── layout/       Header, MobileNav
│   ├── transcript/   TranscriptPanel
│   ├── actions/      ActionCard, ActionsPanel
│   └── export/       ExportCard, SummaryPanel
├── pages/            Home, Analyze, Results, Export
├── store/            MeetingContext (global state, no Redux needed at this size)
├── lib/              groq.ts (transcription + extraction), export.ts (markdown/PDF/share link)
└── types/            shared TypeScript types
```

## Screens

1. **Home** — animated hero, floating action-item cards, two CTAs
2. **Analyze** — tabbed paste-text / upload-audio input
3. **Results** — 3-panel desktop layout (transcript / actions / summary), swipeable bottom-nav layout on mobile
4. **Export** — copy Markdown, download PDF, or copy a shareable link

## Interactions implemented

- Staggered entrance animation for action item cards
- Priority badge cycles high → medium → low on click
- Inline owner editing (click to edit, blur/Enter to commit)
- Due date picker per action item
- Swipe right to complete, swipe left to delete (works with mouse drag too)
- Add new action items inline
- Markdown export, PDF export (multi-page safe), and a shareable link that
  encodes the full result in the URL (`/results?data=...`)

## Deploying

```bash
npm run build
```

Outputs a static `dist/` folder — deploy it to Vercel, Netlify, or any static host.
