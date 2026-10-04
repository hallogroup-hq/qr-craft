import React from 'react'
import { Phone, MessageSquare } from 'lucide-react'
import type { WhatsAppData } from '../../types'

interface WhatsAppFormProps {
  value: WhatsAppData
  onChange: (val: WhatsAppData) => void
}

export const WhatsAppForm: React.FC<WhatsAppFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="wa-phone" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
          Nomor WhatsApp
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Phone className="h-4 w-4" />
          </div>
          <input
            id="wa-phone"
            type="tel"
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            placeholder="08123456789 atau 628123456789"
            className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          Nomor diawali angka 0 akan otomatis dikonversi ke kode negara Indonesia (+62).
        </p>
      </div>

      <div>
        <label htmlFor="wa-message" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
          Draf Pesan Awal (Opsional)
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute top-3 left-3.5 text-slate-400">
            <MessageSquare className="h-4 w-4" />
          </div>
          <textarea
            id="wa-message"
            rows={3}
            value={value.message}
            onChange={(e) => onChange({ ...value, message: e.target.value })}
            placeholder="Halo, saya ingin menanyakan ketersediaan produk..."
            className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          Teks ini akan langsung muncul di kolom ketik chat WhatsApp saat kode QR dipindai.
        </p>
      </div>
    </div>
  )
}
