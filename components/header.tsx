import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="border-b bg-slate-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="TradieConnects Logo" 
            width={160} 
            height={45} 
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation - Hidden on small screens */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="text-sm font-medium text-slate-200 hover:text-white">
            Browse Jobs
          </Link>
          <Link href="/tradies" className="text-sm font-medium text-slate-200 hover:text-white">
            Find Tradies
          </Link>
        </nav>

        {/* Buttons Section */}
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2">
            Login
          </Link>
          <Link 
            href="/post-job" 
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold py-2 px-4 rounded-md transition-colors"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  )
}