import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'React + Next.js Lab', description: 'A practical React and Next.js CRUD project with live weather API integration.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
