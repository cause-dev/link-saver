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
      className={`${inter.className} box-border h-full bg-surface antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MainHeader />
        <main className="flex flex-1 flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
