import React from 'react'
import { FileText } from 'lucide-react'

interface TextFormProps {
  value: string
  onChange: (val: string) => void
}

export const TextForm: React.FC<TextFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="raw-text" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
          Teks Bebas / Catatan
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute top-3 left-3.5 text-slate-400">
            <FileText className="h-4 w-4" />
          </div>
          <textarea
            id="raw-text"
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Tuliskan nomor inventaris, catatan, kupon, atau teks apa pun..."
            className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
          <span>Karakter akan dienkode langsung ke dalam matriks QR.</span>
          <span className="font-mono text-slate-700 font-medium">{value.length} karakter</span>
        </div>
      </div>
    </div>
  )
}
