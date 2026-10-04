import type {
  QrContentType,
  WifiData,
  WhatsAppData,
  VCardData,
  EmailData,
} from '../types'

// Escape special characters in Wi-Fi string (e.g. \ , ; : ")
function escapeWifi(str: string): string {
  return str.replace(/([\\;,:"])/g, '\\$1')
}

export function formatQrContent(
  type: QrContentType,
  data: {
    url: string
    whatsapp: WhatsAppData
    wifi: WifiData
    vcard: VCardData
    email: EmailData
    text: string
  }
): string {
  switch (type) {
    case 'url': {
      let trimmed = data.url.trim()
      if (!trimmed) return 'https://example.com'
      if (!/^https?:\/\//i.test(trimmed)) {
        trimmed = 'https://' + trimmed
      }
      return trimmed
    }

    case 'whatsapp': {
      let cleanPhone = data.whatsapp.phone.replace(/[^0-9]/g, '')
      // Jika nomor dimulai dengan 08..., ganti jadi 628...
      if (cleanPhone.startsWith('0')) {
        cleanPhone = '62' + cleanPhone.slice(1)
      }
      if (!cleanPhone) return 'https://wa.me/'

      const msg = data.whatsapp.message.trim()
      if (msg) {
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
      }
      return `https://wa.me/${cleanPhone}`
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = data.wifi
      const cleanSsid = escapeWifi(ssid.trim())
      const cleanPass = escapeWifi(password)
      const secType = encryption === 'nopass' ? 'nopass' : encryption
      return `WIFI:S:${cleanSsid};T:${secType};P:${cleanPass};H:${hidden ? 'true' : 'false'};;`
    }

    case 'vcard': {
      const {
        firstName,
        lastName,
        organization,
        title,
        phone,
        email,
        website,
        address,
      } = data.vcard

      const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ') || 'Kontak'
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName.trim()};${firstName.trim()};;;`,
        `FN:${fullName}`,
      ]

      if (organization.trim()) lines.push(`ORG:${organization.trim()}`)
      if (title.trim()) lines.push(`TITLE:${title.trim()}`)
      if (phone.trim()) lines.push(`TEL;TYPE=CELL:${phone.trim()}`)
      if (email.trim()) lines.push(`EMAIL:${email.trim()}`)
      if (website.trim()) lines.push(`URL:${website.trim()}`)
      if (address.trim()) lines.push(`ADR:;;${address.trim()};;;;`)
      lines.push('END:VCARD')

      return lines.join('\n')
    }

    case 'email': {
      const { email, subject, body } = data.email
      const cleanEmail = email.trim()
      const params = new URLSearchParams()
      if (subject.trim()) params.append('subject', subject.trim())
      if (body.trim()) params.append('body', body.trim())

      const query = params.toString()
      return `mailto:${cleanEmail}${query ? `?${query}` : ''}`
    }

    case 'text':
    default:
      return data.text.trim() || 'Teks kosong'
  }
}
