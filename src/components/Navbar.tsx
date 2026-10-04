import React from 'react'
import { QrCode, ShieldCheck } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <QrCode className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="font-bold text-base text-slate-900 tracking-tight leading-none">
              QRCraft
            </div>
            <div className="text-[11px] text-slate-500 mt-1 leading-none">
              Studio Generator QR Code
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/60 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Pemrosesan Lokal di Browser</span>
        </div>
      </div>
    </header>
  )
}
