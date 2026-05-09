import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0f172a] shadow-xl">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="TradieConnects" 
            width={240} // Scaled up for impact
            height={60} 
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/jobs" className="text-sm font-bold tracking-wide text-slate-300 hover:text-orange-500 transition-colors uppercase">
            Browse Jobs
          </Link>
          <Link href="/tradies" className="text-sm font-bold tracking-wide text-slate-300 hover:text-orange-500 transition-colors uppercase">
            Find Tradies
          </Link>
        </nav>

        {/* Pro Buttons */}
        <div className="flex items-center space-x-6">
          <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-white">
            Login
          </Link>
          <Link 
            href="/post-job" 
            className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest py-3 px-8 rounded-full shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  )
}