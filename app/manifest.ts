import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Insights Blog',
    short_name: 'AI Insights',
    description: 'Exploring the rapid advancement of artificial intelligence and emerging technologies',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon.svg', // Changed: Using SVG icon instead of corrupted favicon.ico
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}