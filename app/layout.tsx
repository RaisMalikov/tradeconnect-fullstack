import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TradieConnects | NZ's Trade Marketplace",
  description: "Connecting local Kiwi tradies with homeowners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0f172a] text-slate-50 antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}