import type { Metadata } from "next";
import { Inter } from "next/font"
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TradieConnects | Find NZ Tradies",
  description: "The marketplace for New Zealand tradespeople",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0f172a] antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}