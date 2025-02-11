import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_Mono } from 'next/font/google';

const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
});
export const metadata: Metadata = {
  title: "habit",
  description: "track habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansMono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
