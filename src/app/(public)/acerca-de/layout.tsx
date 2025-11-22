import { ReactNode } from 'react';
import Footer from '@/components/footer';

interface AcercaDeLayoutProps {
  children: ReactNode;
}

export default function AcercaDeLayout({ children }: AcercaDeLayoutProps) {
  return (
    <div className="bg-gradient-to-b from-[var(--clr1)] from-50% to-(--clr5) to-60%">
      <main className="max-w-[1024px] my-24 mx-auto p-4 w-full bg-white border border-[var(--clr7)]/50 rounded-lg shadow-lg">
        {children}
      </main>
      <Footer />
    </div>
  );
}