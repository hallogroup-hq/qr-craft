import React, { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import type { Options, FileExtension } from 'qr-code-styling'
import {
  Download,
  Copy,
  Check,
  Eye,
  Printer,
  Loader2,
} from 'lucide-react'
import type { DesignConfig } from '../types'

interface QrPreviewProps {
  content: string
  design: DesignConfig
}

export const QrPreview: React.FC<QrPreviewProps> = ({ content, design }) => {
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling | null>(null)

  const [downloadFormat, setDownloadFormat] = useState<FileExtension>('png')
  const [resolution, setResolution] = useState<number>(1024)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [showRawData, setShowRawData] = useState(false)

  // Membangun opsi QRCodeStyling
  const buildOptions = (size: number): Options => {
    const bgOpts = design.bgTransparent
      ? { color: 'transparent' }
      : { color: design.bgColor }

    const dotsOpts: Options['dotsOptions'] = {
      type: design.dotType,
    }

    if (design.dotGradient.enabled) {
      dotsOpts.gradient = {
        type: design.dotGradient.type,
        rotation: (design.dotGradient.rotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: design.dotGradient.color1 },
          { offset: 1, color: design.dotGradient.color2 },
        ],
      }
    } else {
      dotsOpts.color = design.dotColor
    }

    const cornersSquareOpts: Options['cornersSquareOptions'] = {
      type: design.cornerSquareType,
      color: design.customEyeColor ? design.eyeFrameColor : design.dotColor,
    }

    const cornersDotOpts: Options['cornersDotOptions'] = {
      type: design.cornerDotType,
      color: design.customEyeColor ? design.eyeDotColor : design.dotColor,
    }

    return {
      width: size,
      height: size,
      data: content,
      margin: 12,
      qrOptions: {
        errorCorrectionLevel: design.errorCorrection,
      },
      image: design.logoUrl,
      imageOptions: {
        hideBackgroundDots: design.hideBackgroundDots,
        imageSize: design.logoSize,
        margin: design.logoMargin,
        crossOrigin: 'anonymous',
      },
      dotsOptions: dotsOpts,
      cornersSquareOptions: cornersSquareOpts,
      cornersDotOptions: cornersDotOpts,
      backgroundOptions: bgOpts,
    }
  }

  // Update pratinjau canvas secara live
  useEffect(() => {
    if (!qrRef.current) return

    if (!qrCodeInstance.current) {
      qrCodeInstance.current = new QRCodeStyling(buildOptions(280))
      qrRef.current.innerHTML = ''
      qrCodeInstance.current.append(qrRef.current)
    } else {
      qrCodeInstance.current.update(buildOptions(280))
    }
  }, [content, design])

  // Download Handler
  const handleDownload = async () => {
    try {
      setDownloading(true)
      const targetSize = downloadFormat === 'svg' ? 512 : resolution
      const exportInstance = new QRCodeStyling(buildOptions(targetSize))

      const fileName = `qrcode-${Date.now()}`
      await exportInstance.download({
        name: fileName,
        extension: downloadFormat,
      })
    } catch (err) {
      console.error('Download error:', err)
    } finally {
      setDownloading(false)
    }
  }

  // Salin ke papan klip (PNG)
  const handleCopy = async () => {
    try {
      const copyInstance = new QRCodeStyling(buildOptions(1024))
      const blob = await copyInstance.getRawData('png')
      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob as Blob }),
        ])
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      } else {
        alert('Fitur salin gambar langsung tidak didukung pada browser ini.')
      }
    } catch (err) {
      console.error('Clipboard copy error:', err)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col items-center">
      {/* Header Pratinjau */}
      <div className="w-full flex items-center justify-between pb-3.5 border-b border-slate-100">
        <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
          Pratinjau Hasil
        </h3>
        <button
          type="button"
          onClick={() => setShowRawData(!showRawData)}
          className="btn-press flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showRawData ? 'Tutup Data' : 'Inspeksi Data'}</span>
        </button>
      </div>

      {/* Raw Data Box (Collapsible) */}
      {showRawData && (
        <div className="w-full mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-left">
          <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">DATA RAW:</div>
          <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap break-all max-h-28 overflow-y-auto">
            {content}
          </pre>
        </div>
      )}

      {/* Wadah Tampilan Canvas QR Code */}
      <div className="my-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center relative shadow-inner">
        <div
          ref={qrRef}
          className="overflow-hidden flex items-center justify-center [&>canvas]:rounded-lg [&>canvas]:shadow-xs"
        />
      </div>

      {/* Format & Resolusi */}
      <div className="w-full space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Format Ekspor
          </label>
          <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            {(['png', 'svg', 'jpeg', 'webp'] as FileExtension[]).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setDownloadFormat(fmt)}
                className={`btn-press py-1.5 text-xs font-semibold rounded-lg uppercase transition-colors ${
                  downloadFormat === fmt
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {downloadFormat !== 'svg' && (
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Resolusi Piksel
              </label>
              <span className="text-[11px] text-slate-500 font-mono font-medium">
                {resolution} × {resolution} px
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { px: 512, label: '512 px (Standar)' },
                { px: 1024, label: '1024 px (HD)' },
                { px: 2048, label: '2048 px (Cetak)' },
              ].map((res) => (
                <button
                  key={res.px}
                  type="button"
                  onClick={() => setResolution(res.px)}
                  className={`btn-press py-1.5 px-1 text-center rounded-xl border text-[11px] font-medium transition-colors ${
                    resolution === res.px
                      ? 'border-slate-900 bg-slate-900 text-white font-semibold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {res.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="btn-press flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors text-sm shadow-xs disabled:opacity-50"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Unduh {downloadFormat.toUpperCase()}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="btn-press flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors text-sm shrink-0"
            title="Salin gambar PNG ke papan klip"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Salin Gambar</span>
              </>
            )}
          </button>
        </div>

        {/* Catatan Teknis Percetakan */}
        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Spesifikasi Rekomendasi Cetak:</span>
          </div>
          <ul className="space-y-1 text-slate-500 pl-1">
            <li>• Format SVG merupakan format vektor murni tanpa penurunan resolusi saat diperbesar.</li>
            <li>• Pastikan rasio kontras warna gelap terhadap latar belakang terang minimal 4:1.</li>
            <li>• Ukuran fisik cetak minimal yang disarankan untuk kartu nama adalah 20 × 20 mm.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
