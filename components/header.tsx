import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo - Increased width and added a slight hover effect */}
        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <Image 
            src="/logo.png" 
            alt="TradieConnects Logo" 
            width={220} // Larger logo
            height={70} 
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation - Better spacing and weight */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/jobs" className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors">
            Browse Jobs
          </Link>
          <Link href="/tradies" className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors">
            Find Tradies
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-6">
          <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white">
            Login
          </Link>
          <Link 
            href="/post-job" 
            className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-900/20 transition-all active:scale-95"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  )
}