import React from 'react'
import { Link2, ExternalLink } from 'lucide-react'

interface UrlFormProps {
  value: string
  onChange: (val: string) => void
}

export const UrlForm: React.FC<UrlFormProps> = ({ value, onChange }) => {
  const isValidUrl = Boolean(value.trim())

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url-input" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
          Alamat Website (URL)
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Link2 className="h-4 w-4" />
          </div>
          <input
            id="url-input"
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com"
            className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          Gunakan tautan lengkap. Protokol https:// akan ditambahkan secara otomatis jika tidak ditulis.
        </p>
      </div>

      {isValidUrl && (
        <div className="flex items-center justify-between p-3 bg-slate-100/80 rounded-xl border border-slate-200 text-xs">
          <span className="truncate max-w-[260px] font-mono text-slate-700">{value}</span>
          <a
            href={value.startsWith('http') ? value : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Buka Tautan <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  )
}
