import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/elements/providers";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "The Hacker Library",
  description: "A library for hackers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.className} antialiased`}>
        <Toaster />
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
