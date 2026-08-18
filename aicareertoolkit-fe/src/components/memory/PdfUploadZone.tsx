// src/components/memory/PdfUploadZone.tsx
import { type FC, useRef, useState, useCallback } from 'react'
import { Upload, FileText, Loader2 } from 'lucide-react'

interface Props {
  onFileSelected: (file: File) => void
  isUploading: boolean
  uploadProgress: number
}

export const PdfUploadZone: FC<Props> = ({ onFileSelected, isUploading, uploadProgress }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFile = useCallback(
    (file: File) => {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert('Only PDF files are accepted.')
        return
      }
      onFileSelected(file)
    },
    [onFileSelected],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={onDrop}
      onClick={() => !isUploading && inputRef.current?.click()}
      className={`
        relative flex flex-col items-center justify-center gap-4
        rounded-2xl border-2 border-dashed p-12 cursor-pointer
        transition-all duration-300 select-none
        ${isDragOver
          ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
          : 'border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/10'
        }
        ${isUploading ? 'pointer-events-none opacity-80' : ''}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      {isUploading ? (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
          <div className="w-full max-w-xs text-center">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              Ingesting &amp; parsing resume… {uploadProgress}%
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              PyMuPDF extraction ➔ Semantic chunking ➔ Gemini vector embeddings
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-2xl bg-emerald-100 p-4 dark:bg-emerald-900/30">
            <Upload className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Set up your Career Memory Bank
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Drag &amp; drop your latest resume PDF here, or{' '}
              <span className="font-medium text-emerald-600 underline dark:text-emerald-400">click to browse</span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <FileText className="h-3.5 w-3.5 text-emerald-500" />
            PDF files only — parsed with PyMuPDF &amp; vectorized
          </div>
        </>
      )}
    </div>
  )
}
