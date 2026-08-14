import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Waveform } from './Waveform'

export function AudioDropzone({ onFile }: { onFile: (file: File) => void }) {
  const [fileName, setFileName] = useState<string | null>(null)

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) {
        setFileName(accepted[0].name)
        onFile(accepted[0])
      }
    },
    [onFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.wav', '.m4a', '.webm'] },
    maxFiles: 1,
  })

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors cursor-pointer ${
        isDragActive ? 'border-violet bg-violet/10' : 'glass-inset border-line hover:border-line-bright'
      }`}
    >
      <input {...getInputProps()} />
      <motion.div animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}>
        <Waveform bars={28} active={isDragActive} className="h-12" />
      </motion.div>
      {fileName ? (
        <p className="text-sm text-ink">🎧 {fileName}</p>
      ) : (
        <>
          <p className="text-sm text-ink-dim">Drag & drop an audio file, or click to browse</p>
          <p className="text-xs text-ink-faint">MP3, WAV, M4A · up to 25MB</p>
        </>
      )}
    </div>
  )
}