import type { Metadata } from "next";
import { Inter } from "next/font/google";

import MainHeader from "@/components/main-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Link Saver",
  description: "Save links and access later",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased bg-surface box-border`}
    >
      <body className="min-h-full flex flex-col">
        <MainHeader />
        <main className="flex-1 flex flex-col justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
