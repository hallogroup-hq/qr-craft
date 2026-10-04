import type {
  DotType,
  CornerDotType,
  CornerSquareType,
  ErrorCorrectionLevel,
} from 'qr-code-styling'

export type QrContentType = 'url' | 'whatsapp' | 'wifi' | 'vcard' | 'email' | 'text'

export interface WifiData {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'nopass'
  hidden: boolean
}

export interface WhatsAppData {
  phone: string
  message: string
}

export interface VCardData {
  firstName: string
  lastName: string
  organization: string
  title: string
  phone: string
  email: string
  website: string
  address: string
}

export interface EmailData {
  email: string
  subject: string
  body: string
}

export interface ColorGradient {
  enabled: boolean
  type: 'linear' | 'radial'
  rotation: number
  color1: string
  color2: string
}

export interface DesignConfig {
  dotType: DotType
  cornerSquareType: CornerSquareType
  cornerDotType: CornerDotType
  // Dots Color
  dotColor: string
  dotGradient: ColorGradient
  // Custom Eye Colors (optional)
  customEyeColor: boolean
  eyeFrameColor: string
  eyeDotColor: string
  // Background
  bgColor: string
  bgTransparent: boolean
  // Logo
  logoUrl?: string
  logoSize: number // 0.15 - 0.4
  logoMargin: number // 0 - 20
  hideBackgroundDots: boolean
  // Reliability
  errorCorrection: ErrorCorrectionLevel
}

export interface ColorPreset {
  id: string
  name: string
  dotColor: string
  dotGradient?: ColorGradient
  eyeFrameColor?: string
  eyeDotColor?: string
  bgColor: string
}
