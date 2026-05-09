import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "TradieConnects",
  description: "Direct jobs for tradies in New Zealand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] antialiased">
  <Header />
  {children}
</body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}