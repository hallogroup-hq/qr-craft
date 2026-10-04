import React from 'react'
import { Mail, MessageSquare } from 'lucide-react'
import type { EmailData } from '../../types'

interface EmailFormProps {
  value: EmailData
  onChange: (val: EmailData) => void
}

export const EmailForm: React.FC<EmailFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="email-to" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
          Alamat Email Tujuan
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Mail className="h-4 w-4" />
          </div>
          <input
            id="email-to"
            type="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            placeholder="kontak@perusahaan.com"
            className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email-sub" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
          Subjek Surat
        </label>
        <input
          id="email-sub"
          type="text"
          value={value.subject}
          onChange={(e) => onChange({ ...value, subject: e.target.value })}
          placeholder="Pertanyaan Seputar Layanan"
          className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
        />
      </div>

      <div>
        <label htmlFor="email-body" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
          Isi Pesan (Opsional)
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute top-3 left-3.5 text-slate-400">
            <MessageSquare className="h-4 w-4" />
          </div>
          <textarea
            id="email-body"
            rows={3}
            value={value.body}
            onChange={(e) => onChange({ ...value, body: e.target.value })}
            placeholder="Tulis draf pesan email di sini..."
            className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
          />
        </div>
      </div>
    </div>
  )
}
