export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'tb4m7q9x2v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Tote Bagus',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Image-led finds with deal-driven browsing',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A visual shopping and classifieds experience built around standout images and quick browsing.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'totebagus.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://totebagus.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

