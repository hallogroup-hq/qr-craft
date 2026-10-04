import React, { useRef } from 'react'
import {
  Palette,
  Sliders,
  Image as ImageIcon,
  ShieldCheck,
  Upload,
  Trash2,
} from 'lucide-react'
import type { DesignConfig, ColorPreset } from '../types'
import { COLOR_PRESETS, PRESET_LOGOS } from '../constants'
import type { DotType, CornerSquareType, CornerDotType, ErrorCorrectionLevel } from 'qr-code-styling'

interface DesignControlsProps {
  config: DesignConfig
  onChange: (cfg: DesignConfig) => void
}

const DOT_STYLES: { id: DotType; label: string }[] = [
  { id: 'rounded', label: 'Rounded' },
  { id: 'dots', label: 'Dots' },
  { id: 'classy', label: 'Classy' },
  { id: 'classy-rounded', label: 'Classy Round' },
  { id: 'extra-rounded', label: 'Extra Round' },
  { id: 'square', label: 'Square' },
]

const CORNER_SQUARE_STYLES: { id: CornerSquareType; label: string }[] = [
  { id: 'extra-rounded', label: 'Modern Round' },
  { id: 'dot', label: 'Lingkaran' },
  { id: 'square', label: 'Klasik Kotak' },
]

const CORNER_DOT_STYLES: { id: CornerDotType; label: string }[] = [
  { id: 'dot', label: 'Bulat' },
  { id: 'square', label: 'Kotak' },
]

const ERROR_LEVELS: { id: ErrorCorrectionLevel; label: string; desc: string }[] = [
  { id: 'L', label: 'Level L (7%)', desc: 'Kapasitas maksimal data' },
  { id: 'M', label: 'Level M (15%)', desc: 'Standar umum' },
  { id: 'Q', label: 'Level Q (25%)', desc: 'Ketahanan gores tinggi' },
  { id: 'H', label: 'Level H (30%)', desc: 'Optimal saat menggunakan logo' },
]

export const DesignControls: React.FC<DesignControlsProps> = ({ config, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleApplyPreset = (preset: ColorPreset) => {
    onChange({
      ...config,
      dotColor: preset.dotColor,
      dotGradient: preset.dotGradient || {
        enabled: false,
        type: 'linear',
        rotation: 45,
        color1: preset.dotColor,
        color2: preset.dotColor,
      },
      bgColor: preset.bgColor,
      bgTransparent: false,
      customEyeColor: Boolean(preset.eyeFrameColor),
      eyeFrameColor: preset.eyeFrameColor || preset.dotColor,
      eyeDotColor: preset.eyeDotColor || preset.dotColor,
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      onChange({
        ...config,
        logoUrl: dataUrl,
        errorCorrection: 'H', // Tingkatkan otomatis ke H agar QR tetap mudah dipindai
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      {/* 1. Presets Warna */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2.5">
          <Palette className="w-3.5 h-3.5 text-slate-600" />
          Pilihan Palet Warna
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COLOR_PRESETS.map((p) => {
            const isGradient = p.dotGradient?.enabled
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="btn-press flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors text-left bg-white text-xs font-medium text-slate-800 shadow-xs"
              >
                <div
                  className="w-5 h-5 rounded-md border border-slate-300 shrink-0 shadow-inner"
                  style={{
                    background: isGradient
                      ? `linear-gradient(135deg, ${p.dotGradient?.color1}, ${p.dotGradient?.color2})`
                      : p.dotColor,
                  }}
                />
                <span className="truncate">{p.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Bentuk Pola Dots */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2.5">
          <Sliders className="w-3.5 h-3.5 text-slate-600" />
          Pola Titik (Dots)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DOT_STYLES.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => onChange({ ...config, dotType: style.id })}
              className={`btn-press p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                config.dotType === style.id
                  ? 'border-slate-900 bg-slate-900 text-white font-semibold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Bentuk Sudut Mata QR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
            Bingkai Sudut
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {CORNER_SQUARE_STYLES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onChange({ ...config, cornerSquareType: c.id })}
                className={`btn-press py-2 px-1 text-center rounded-xl border text-[11px] font-medium transition-colors ${
                  config.cornerSquareType === c.id
                    ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
            Titik Sudut
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {CORNER_DOT_STYLES.map((cd) => (
              <button
                key={cd.id}
                type="button"
                onClick={() => onChange({ ...config, cornerDotType: cd.id })}
                className={`btn-press py-2 px-1 text-center rounded-xl border text-[11px] font-medium transition-colors ${
                  config.cornerDotType === cd.id
                    ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {cd.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Pengaturan Warna Custom */}
      <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
            Kustomisasi Warna Matriks
          </span>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={config.dotGradient.enabled}
              onChange={(e) =>
                onChange({
                  ...config,
                  dotGradient: { ...config.dotGradient, enabled: e.target.checked },
                })
              }
              className="rounded border-slate-300 text-indigo-600 focus:ring-0"
            />
            <span>Gunakan Gradien Dua Warna</span>
          </label>
        </div>

        {config.dotGradient.enabled ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="block text-xs text-slate-600 mb-1 font-medium">Warna Awal</span>
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-300">
                <input
                  type="color"
                  value={config.dotGradient.color1}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      dotGradient: { ...config.dotGradient, color1: e.target.value },
                    })
                  }
                  className="w-7 h-7 rounded-md cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={config.dotGradient.color1}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      dotGradient: { ...config.dotGradient, color1: e.target.value },
                    })
                  }
                  className="w-20 text-xs font-mono uppercase text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs text-slate-600 mb-1 font-medium">Warna Akhir</span>
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-300">
                <input
                  type="color"
                  value={config.dotGradient.color2}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      dotGradient: { ...config.dotGradient, color2: e.target.value },
                    })
                  }
                  className="w-7 h-7 rounded-md cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={config.dotGradient.color2}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      dotGradient: { ...config.dotGradient, color2: e.target.value },
                    })
                  }
                  className="w-20 text-xs font-mono uppercase text-slate-800 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span className="block text-xs text-slate-600 mb-1 font-medium">Warna Pola QR</span>
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-300 max-w-[200px]">
              <input
                type="color"
                value={config.dotColor}
                onChange={(e) =>
                  onChange({
                    ...config,
                    dotColor: e.target.value,
                    dotGradient: { ...config.dotGradient, color1: e.target.value },
                  })
                }
                className="w-7 h-7 rounded-md cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={config.dotColor}
                onChange={(e) =>
                  onChange({
                    ...config,
                    dotColor: e.target.value,
                    dotGradient: { ...config.dotGradient, color1: e.target.value },
                  })
                }
                className="w-24 text-xs font-mono uppercase text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Warna Latar Belakang */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-700">Warna Latar Belakang</span>
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={config.bgTransparent}
                onChange={(e) => onChange({ ...config, bgTransparent: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-0"
              />
              <span>Latar Transparan</span>
            </label>
          </div>
          {!config.bgTransparent && (
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-300 max-w-[200px]">
              <input
                type="color"
                value={config.bgColor}
                onChange={(e) => onChange({ ...config, bgColor: e.target.value })}
                className="w-7 h-7 rounded-md cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={config.bgColor}
                onChange={(e) => onChange({ ...config, bgColor: e.target.value })}
                className="w-24 text-xs font-mono uppercase text-slate-800 focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* 5. Logo di Tengah QR */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2.5">
          <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
          Logo di Tengah QR Code
        </label>
        
        {/* Preset Ikon */}
        <div className="flex flex-wrap gap-2 mb-3">
          {PRESET_LOGOS.map((p) => {
            const isSelected = p.iconUrl === '' ? !config.logoUrl : config.logoUrl === p.iconUrl
            return (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...config,
                    logoUrl: p.iconUrl || undefined,
                    errorCorrection: p.iconUrl ? 'H' : config.errorCorrection,
                  })
                }
                className={`btn-press flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {p.iconUrl ? (
                  <img src={p.iconUrl} alt={p.name} className="w-3.5 h-3.5 object-contain" />
                ) : null}
                <span>{p.name}</span>
              </button>
            )
          })}
        </div>

        {/* Upload Tombol */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-press flex items-center gap-2 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            Unggah Berkas Logo (PNG/SVG)
          </button>

          {config.logoUrl && (
            <button
              type="button"
              onClick={() => onChange({ ...config, logoUrl: undefined })}
              className="btn-press flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-medium border border-rose-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Hapus Logo
            </button>
          )}
        </div>

        {/* Kontrol Ukuran & Padding Logo */}
        {config.logoUrl && (
          <div className="mt-3 p-3 bg-slate-100/70 rounded-xl border border-slate-200 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1 font-medium">
                <span>Proporsi Ukuran Logo</span>
                <span className="font-mono">{Math.round(config.logoSize * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="0.36"
                step="0.01"
                value={config.logoSize}
                onChange={(e) => onChange({ ...config, logoSize: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1 font-medium">
                <span>Jarak Tepi Bersih (Padding)</span>
                <span className="font-mono">{config.logoMargin}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                step="1"
                value={config.logoMargin}
                onChange={(e) => onChange({ ...config, logoMargin: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>
          </div>
        )}
      </div>

      {/* 6. Error Correction Level */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
          Tingkat Koreksi Kerusakan (Error Correction)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ERROR_LEVELS.map((el) => (
            <button
              key={el.id}
              type="button"
              onClick={() => onChange({ ...config, errorCorrection: el.id })}
              className={`btn-press p-2.5 rounded-xl border text-left transition-colors ${
                config.errorCorrection === el.id
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-semibold">{el.label}</div>
              <div className={`text-[10px] mt-0.5 ${config.errorCorrection === el.id ? 'text-slate-300' : 'text-slate-500'}`}>
                {el.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
