import { useState, useMemo } from 'react'
import { Navbar } from './components/Navbar'
import { TabNavigation } from './components/TabNavigation'
import { UrlForm } from './components/ContentForms/UrlForm'
import { WhatsAppForm } from './components/ContentForms/WhatsAppForm'
import { WifiForm } from './components/ContentForms/WifiForm'
import { VCardForm } from './components/ContentForms/VCardForm'
import { EmailForm } from './components/ContentForms/EmailForm'
import { TextForm } from './components/ContentForms/TextForm'
import { DesignControls } from './components/DesignControls'
import { QrPreview } from './components/QrPreview'
import { formatQrContent } from './utils/qrHelpers'
import { DEFAULT_DESIGN } from './constants'
import type {
  QrContentType,
  DesignConfig,
  WifiData,
  WhatsAppData,
  VCardData,
  EmailData,
} from './types'
import {
  Palette,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileCode,
  CheckCircle,
} from 'lucide-react'

export function App() {
  const [contentType, setContentType] = useState<QrContentType>('url')

  // Data State
  const [url, setUrl] = useState<string>('http://edu.cherrycoffeeroastery.com/')
  const [whatsapp, setWhatsapp] = useState<WhatsAppData>({
    phone: '',
    message: '',
  })
  const [wifi, setWifi] = useState<WifiData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  })
  const [vcard, setVcard] = useState<VCardData>({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    phone: '',
    email: '',
    website: '',
    address: '',
  })
  const [email, setEmail] = useState<EmailData>({
    email: '',
    subject: '',
    body: '',
  })
  const [text, setText] = useState<string>('')

  // Design State
  const [design, setDesign] = useState<DesignConfig>(DEFAULT_DESIGN)
  const [activeConfigTab, setActiveConfigTab] = useState<'content' | 'design'>('content')

  // Enkode data QR
  const encodedContent = useMemo(() => {
    return formatQrContent(contentType, {
      url,
      whatsapp,
      wifi,
      vcard,
      email,
      text,
    })
  }, [contentType, url, whatsapp, wifi, vcard, email, text])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Navbar />

      {/* Hero / Studio Intro */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Generator QR Code Siap Cetak dan Digital
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Buat kode QR dengan parameter kustom untuk kebutuhan cetak kemasan, kartu nama bisnis, Wi-Fi kafe, dan tautan digital. Menyediakan ekspor format SVG vektor dan PNG resolusi tinggi.
            </p>
          </div>
        </div>
      </section>

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Form & Design Settings */}
          <div className="lg:col-span-7 space-y-6">

            {/* Segmented Step Switcher */}
            <div className="flex bg-slate-200/70 p-1 rounded-2xl border border-slate-300/60">
              <button
                type="button"
                onClick={() => setActiveConfigTab('content')}
                className={`btn-press flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                  activeConfigTab === 'content'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>1. Tentukan Konten</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveConfigTab('design')}
                className={`btn-press flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                  activeConfigTab === 'design'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>2. Kustomisasi Visual</span>
              </button>
            </div>

            {/* Panel 1: Konten */}
            {activeConfigTab === 'content' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-slate-900">
                      Pilih Jenis Informasi
                    </h2>
                    <span className="text-xs text-slate-500">
                      Langkah 1 dari 2
                    </span>
                  </div>
                  <TabNavigation
                    activeTab={contentType}
                    onSelectTab={(tab) => setContentType(tab)}
                  />
                </div>

                <div className="pt-2 border-t border-slate-100">
                  {contentType === 'url' && (
                    <UrlForm value={url} onChange={setUrl} />
                  )}
                  {contentType === 'whatsapp' && (
                    <WhatsAppForm value={whatsapp} onChange={setWhatsapp} />
                  )}
                  {contentType === 'wifi' && (
                    <WifiForm value={wifi} onChange={setWifi} />
                  )}
                  {contentType === 'vcard' && (
                    <VCardForm value={vcard} onChange={setVcard} />
                  )}
                  {contentType === 'email' && (
                    <EmailForm value={email} onChange={setEmail} />
                  )}
                  {contentType === 'text' && (
                    <TextForm value={text} onChange={setText} />
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveConfigTab('design')}
                    className="btn-press flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <span>Lanjut ke Kustomisasi Desain</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Panel 2: Desain & Logo */}
            {activeConfigTab === 'design' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Pengaturan Desain & Logo
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sesuaikan pola titik, bentuk mata sudut, palet warna, dan lambang brand.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDesign(DEFAULT_DESIGN)}
                    className="btn-press text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
                  >
                    Atur Ulang
                  </button>
                </div>

                <DesignControls config={design} onChange={setDesign} />
              </div>
            )}

            {/* Pedoman Teknis & Komposisi */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Standar Kualitas & Kompatibilitas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                    <FileCode className="w-3.5 h-3.5 text-slate-600" />
                    <span>SVG Vektor Lossless</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Dapat diskalakan tanpa batas untuk cetak offset, plotter, kemasan produk, dan banner.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                    <CheckCircle className="w-3.5 h-3.5 text-slate-600" />
                    <span>Pemindaian Cepat</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Koreksi kesalahan Reed-Solomon menjamin kode tetap terbaca meski sebagian tertutup logo.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                    <span>Privasi Penuh</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Pembuatan kode berjalan sepenuhnya di memori peramban tanpa transmisi jaringan.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Anchored Live Output Canvas */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            <QrPreview content={encodedContent} design={design} />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="flex items-center justify-center gap-2 font-medium text-slate-700">
            <span>QRCraft Studio</span>
            <span>•</span>
            <span>Perangkat Lunak Pembuat QR Code Mandiri</span>
          </div>
          <p className="text-slate-400">
            Dilisensikan untuk penggunaan bebas. Data Anda tidak pernah meninggalkan peramban.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
