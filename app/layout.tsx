import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { prisma } from "@/lib/prisma";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export async function generateMetadata(): Promise<Metadata> {
  const websiteTitle = await prisma.setting.findUnique({
    where: { key: 'website_title' }
  })
  const websiteFavicon = await prisma.setting.findUnique({
    where: { key: 'website_favicon' }
  })

  const siteName = websiteTitle?.value || 'Al Azhar IIBS'

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`, // This allows child pages to override title
    },
    description: "Al Azhar International Islamic Boarding School - Qur'anic Learning, Courtesy Oriented and World Class Education",
    icons: websiteFavicon?.value ? {
      icon: websiteFavicon.value,
      shortcut: websiteFavicon.value,
      apple: websiteFavicon.value,
    } : undefined,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

