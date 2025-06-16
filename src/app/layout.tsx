import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/themecontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erikcorkran.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Erik Corkran',
  description: 'Personal blog and thoughts on technology, AI, and software development',
  openGraph: {
    title: 'Erik Corkran',
    description: 'Personal blog and thoughts on technology, AI, and software development',
    url: '/',
    siteName: 'Erik Corkran',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Erik Corkran Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var stored = localStorage.getItem('ui-theme');
                if (stored) {
                  document.documentElement.classList.add(stored);
                } else {
                  var media = window.matchMedia('(prefers-color-scheme: dark)');
                  document.documentElement.classList.add(media.matches ? 'dark' : 'light');
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-200 ease-in-out`}
      >
        <ThemeProvider
          defaultTheme="dark" 
          storageKey="ui-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
