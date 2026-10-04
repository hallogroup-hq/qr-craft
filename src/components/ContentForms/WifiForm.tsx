import React, { useState } from 'react'
import { Wifi, KeyRound, Eye, EyeOff } from 'lucide-react'
import type { WifiData } from '../../types'

interface WifiFormProps {
  value: WifiData
  onChange: (val: WifiData) => void
}

export const WifiForm: React.FC<WifiFormProps> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="wifi-ssid" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
          Nama Jaringan (SSID)
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Wifi className="h-4 w-4" />
          </div>
          <input
            id="wifi-ssid"
            type="text"
            value={value.ssid}
            onChange={(e) => onChange({ ...value, ssid: e.target.value })}
            placeholder="Contoh: CoffeeRoastery_Guest"
            className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
          />
        </div>
      </div>

      {value.encryption !== 'nopass' && (
        <div>
          <label htmlFor="wifi-pass" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
            Kata Sandi Wi-Fi
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <KeyRound className="h-4 w-4" />
            </div>
            <input
              id="wifi-pass"
              type={showPassword ? 'text' : 'password'}
              value={value.password}
              onChange={(e) => onChange({ ...value, password: e.target.value })}
              placeholder="Masukkan kata sandi..."
              className="block w-full rounded-xl border border-slate-300 pl-10 pr-10 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:border-slate-900 focus:ring-0 transition-colors bg-white shadow-xs"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              onClick={() => setShowPassword(!showPassword)}
              className="btn-press absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label htmlFor="wifi-enc" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
            Tipe Keamanan
          </label>
          <select
            id="wifi-enc"
            value={value.encryption}
            onChange={(e) =>
              onChange({
                ...value,
                encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
              })
            }
            className="block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-slate-900 text-sm focus:border-slate-900 focus:ring-0 bg-white shadow-xs"
          >
            <option value="WPA">WPA / WPA2 / WPA3 (Standar)</option>
            <option value="WEP">WEP (Jaringan Lama)</option>
            <option value="nopass">Tanpa Sandi (Terbuka)</option>
          </select>
        </div>

        <div className="flex items-center sm:pt-6">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={value.hidden}
              onChange={(e) => onChange({ ...value, hidden: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-0"
            />
            <span>Jaringan Tersembunyi (Hidden SSID)</span>
          </label>
        </div>
      </div>

      <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-200/80">
        Perangkat iOS dan Android akan otomatis mengenali format ini dan menawarkan opsi untuk langsung bergabung ke jaringan tanpa perlu mengetik manual.
      </div>
    </div>
  )
}
