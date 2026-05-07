import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-10 p-6 text-center text-sm text-slate-500">
      <div className="space-x-4">
        <Link href="/terms" className="hover:underline">
          Terms
        </Link>

        <Link href="/privacy" className="hover:underline">
          Privacy
        </Link>
      </div>

      <p className="mt-3">
        © 2026 TradieConnectss
      </p>
    </footer>
  );
}