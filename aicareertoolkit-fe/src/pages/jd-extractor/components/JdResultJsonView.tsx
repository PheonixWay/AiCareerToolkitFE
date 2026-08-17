// src/pages/jd-extractor/components/JdResultJsonView.tsx
import type { FC } from 'react'
import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import type { JdExtractionResult } from '@/types/jd.types'

interface JdResultJsonViewProps {
  data: JdExtractionResult
}

export const JdResultJsonView: FC<JdResultJsonViewProps> = ({ data }) => {
  const [copied, setCopied] = useState(false)
  const jsonString = JSON.stringify(data, null, 2)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy json', err)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 flex items-center gap-1 text-xs font-mono text-slate-400">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            JDExtractionModel.json
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy JSON</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 max-h-[600px] overflow-auto">
        <pre className="text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre-wrap break-all">
          {jsonString}
        </pre>
      </div>
    </div>
  )
}
