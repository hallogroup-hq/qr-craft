import type { ColorPreset, DesignConfig } from './types'

export const DEFAULT_DESIGN: DesignConfig = {
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  dotColor: '#09090b',
  dotGradient: {
    enabled: false,
    type: 'linear',
    rotation: 45,
    color1: '#09090b',
    color2: '#27272a',
  },
  customEyeColor: false,
  eyeFrameColor: '#09090b',
  eyeDotColor: '#09090b',
  bgColor: '#ffffff',
  bgTransparent: false,
  logoUrl: undefined,
  logoSize: 0.26,
  logoMargin: 6,
  hideBackgroundDots: true,
  errorCorrection: 'Q',
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'deep-slate',
    name: 'Hitam Netral',
    dotColor: '#09090b',
    bgColor: '#ffffff',
  },
  {
    id: 'ocean-deep',
    name: 'Biru Samudra',
    dotColor: '#0f172a',
    dotGradient: {
      enabled: true,
      type: 'linear',
      rotation: 45,
      color1: '#0284c7',
      color2: '#1e3a8a',
    },
    bgColor: '#ffffff',
  },
  {
    id: 'coffee-artisan',
    name: 'Kopi Hangat',
    dotColor: '#451a03',
    dotGradient: {
      enabled: true,
      type: 'linear',
      rotation: 35,
      color1: '#78350f',
      color2: '#451a03',
    },
    bgColor: '#fffdfa',
  },
  {
    id: 'forest-emerald',
    name: 'Hijau Botol',
    dotColor: '#064e3b',
    dotGradient: {
      enabled: true,
      type: 'linear',
      rotation: 45,
      color1: '#047857',
      color2: '#064e3b',
    },
    bgColor: '#ffffff',
  },
  {
    id: 'warm-terracotta',
    name: 'Terracotta',
    dotColor: '#9a3412',
    dotGradient: {
      enabled: true,
      type: 'linear',
      rotation: 45,
      color1: '#c2410c',
      color2: '#7c2d12',
    },
    bgColor: '#ffffff',
  },
  {
    id: 'deep-indigo',
    name: 'Indigo Malam',
    dotColor: '#1e1b4b',
    dotGradient: {
      enabled: true,
      type: 'linear',
      rotation: 45,
      color1: '#4338ca',
      color2: '#1e1b4b',
    },
    bgColor: '#ffffff',
  },
]

// Preset Icons as pure Data URLs
export const PRESET_LOGOS = [
  {
    id: 'none',
    name: 'Tanpa Logo',
    iconUrl: '',
  },
  {
    id: 'link',
    name: 'Tautan Web',
    iconUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2309090b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    iconUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%2316a34a"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.5 14.2c-.2.7-1.3 1.3-1.8 1.4-.5.1-1.1.2-3.6-.8-3.1-1.3-5-4.4-5.2-4.6-.1-.2-1.3-1.7-1.3-3.3 0-1.6.8-2.3 1.1-2.6.3-.3.7-.4 1-.4h.3c.3 0 .6 0 .9.7.3.7 1 2.5 1.1 2.7 0 .2 0 .4-.1.6-.1.2-.2.3-.3.5l-.5.5c-.2.2-.3.3-.1.7.3.5.7 1.2 1.4 1.8 1 1 1.8 1.3 2.1 1.4.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.8.8 2.1 1 .3.2.5.3.6.4 0 .3-.1 1.1-.3 1.8z"/></svg>',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    iconUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%230284c7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  },
  {
    id: 'coffee',
    name: 'Kafe / Kopi',
    iconUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2378350f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>',
  },
]
