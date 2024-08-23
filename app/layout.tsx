import '@/app/ui/global.css'; //Add global styles to your application
import { inter } from '@/app/ui/fonts'; //add the font to the <body> element in /app/layout.tsx

//import metadata
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | AAAA Acme Dashboard',
    default: 'AAAA Acme Dashboard',
  },
  description: 'AAAA The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
