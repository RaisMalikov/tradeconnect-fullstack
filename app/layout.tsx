import type { Metadata } from "next";
import { Inter } from "next/font/google"
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
      {/* text-slate-50 makes all default text off-white. selection:bg-orange-500 is a premium touch */}
      <body className={`${inter.className} bg-[#0f172a] text-slate-50 antialiased selection:bg-orange-500 selection:text-white`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}