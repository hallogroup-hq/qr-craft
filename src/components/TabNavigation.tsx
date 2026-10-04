import React from 'react'
import { Link2, MessageSquare, Wifi, UserCheck, Mail, FileText } from 'lucide-react'
import type { QrContentType } from '../types'

interface TabNavigationProps {
  activeTab: QrContentType
  onSelectTab: (tab: QrContentType) => void
}

const TABS: { id: QrContentType; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'url', label: 'Tautan URL', icon: Link2 },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'wifi', label: 'Jaringan Wi-Fi', icon: Wifi },
  { id: 'vcard', label: 'Kontak vCard', icon: UserCheck },
  { id: 'email', label: 'Pesan Email', icon: Mail },
  { id: 'text', label: 'Teks Bebas', icon: FileText },
]

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onSelectTab }) => {
  return (
    <div
      role="tablist"
      aria-label="Tipe Konten QR Code"
      className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`btn-press flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 border border-transparent'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
            <span className="truncate">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
