import React from 'react'
import type { VCardData } from '../../types'

interface VCardFormProps {
  value: VCardData
  onChange: (val: VCardData) => void
}

export const VCardForm: React.FC<VCardFormProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof VCardData, val: string) => {
    onChange({ ...value, [field]: val })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="vc-firstname" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            Nama Depan
          </label>
          <input
            id="vc-firstname"
            type="text"
            value={value.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Akmal"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          />
        </div>
        <div>
          <label htmlFor="vc-lastname" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            Nama Belakang
          </label>
          <input
            id="vc-lastname"
            type="text"
            value={value.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Irsyad"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="vc-org" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            Perusahaan / Organisasi
          </label>
          <input
            id="vc-org"
            type="text"
            value={value.organization}
            onChange={(e) => handleChange('organization', e.target.value)}
            placeholder="Cherry Coffee Roastery"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          />
        </div>
        <div>
          <label htmlFor="vc-title" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            Jabatan / Profesi
          </label>
          <input
            id="vc-title"
            type="text"
            value={value.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Founder / Head Roaster"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="vc-phone" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            Nomor Telepon
          </label>
          <input
            id="vc-phone"
            type="tel"
            value={value.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+62 812 3456 7890"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          />
        </div>
        <div>
          <label htmlFor="vc-email" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            Email
          </label>
          <input
            id="vc-email"
            type="email"
            value={value.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="halo@domain.com"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="vc-web" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            Website
          </label>
          <input
            id="vc-web"
            type="url"
            value={value.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          />
        </div>
        <div>
          <label htmlFor="vc-addr" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            Lokasi / Alamat Singkat
          </label>
          <input
            id="vc-addr"
            type="text"
            value={value.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Jakarta, Indonesia"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          />
        </div>
      </div>

      <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-200/80">
        Standar vCard 3.0: Menyediakan aksi satu sentuhan untuk menyimpan seluruh profil kontak ke buku telepon ponsel saat dipindai.
      </div>
    </div>
  )
}
