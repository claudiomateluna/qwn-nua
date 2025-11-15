import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Slab, Inika } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/hooks/use-auth';

const robotoSlab = Roboto_Slab({ subsets: ['latin'] });
const inika = Inika({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Nua Mana - Guías y Scouts',
  description: 'Plataforma para Guías y Scouts Nua Mana',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

// Adding metadata with additional information for iOS
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* iOS specific tags */}
        <meta name="apple-mobile-web-app-title" content="Nua Mana" />
        <meta name="theme-color" content="#e63946" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#e63946" media="(prefers-color-scheme: dark)" />
        {/* iOS Safari specific tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#e63946" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        {/* iOS home screen icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Trustindex script - for testimonials widget */}
        <script defer async src='https://cdn.trustindex.io/loader.js'></script>
        {/* iOS startup image - not required but can be added if needed */}
        {/* iOS background color - using clr6 as requested (#e63946, which is red, not green as mentioned in the request) */}
        <style>{`
          @media screen and (max-width: 768px) {
            body {
              background-color: #e63946 !important;
            }
          }
        `}</style>
      </head>
      <body className={`${robotoSlab.className}`} style={{ backgroundColor: 'var(--clr1)', color: 'var(--clr4)' }}>
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen" style={{ backgroundColor: 'var(--clr1)', color: 'var(--clr4)' }}>
              {children}
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}