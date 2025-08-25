import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://carnageremaps.co.uk'
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about',
        '/services',
        '/contact',
        '/blog',
        '/testimonials',
        '/gallery',
        '/faq',
        '/terms',
        '/login',
        '/signup',
      ],
      disallow: [
        '/dashboard/',
        '/admin-dashboard/',
        '/api/',
        '/uploads/',
        '/payment/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
