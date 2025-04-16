import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import ClarityProvider from '@/components/ClarityProvider'; 
//import { BeamsBackground } from '@/components/ui/beams-background'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Join the Waitlist',
  description: 'Join our exclusive waitlist for early access and special benefits.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-black'}>
        <ClarityProvider /> 
        {/*<BeamsBackground intensity="strong">*/}
          {children}
        {/*</BeamsBackground>*/}
        <Toaster />
      </body>
    </html>
  );
}
