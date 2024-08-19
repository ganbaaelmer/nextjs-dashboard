import '@/app/ui/global.css'; //Add global styles to your application
import { inter } from '@/app/ui/fonts'; //add the font to the <body> element in /app/layout.tsx

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
