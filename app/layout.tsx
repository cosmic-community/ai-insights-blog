import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Insights Blog',
  description: 'Exploring the rapid advancement of artificial intelligence and emerging technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-primary">
                AI Insights
              </Link>
              <div className="flex gap-6">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/categories/artificial-intelligence" 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  AI
                </Link>
                <Link 
                  href="/categories/future-tech" 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Future Tech
                </Link>
                <Link 
                  href="/categories/technology" 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Technology
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} AI Insights Blog. All rights reserved.
            </p>
          </div>
        </footer>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}