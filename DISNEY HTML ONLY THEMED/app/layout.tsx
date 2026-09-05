import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'One Castle. Many Realms. — Disney Homepage Concept',
  description: 'An independent portfolio concept for a more immersive Disney homepage.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
