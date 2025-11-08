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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${robotoSlab.className} ${inika.className}`} style={{ backgroundColor: 'var(--clr1)', color: 'var(--clr4)' }}>
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