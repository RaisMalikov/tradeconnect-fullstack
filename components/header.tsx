import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full border-b border-slate-800 bg-[#000000]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="TradieConnects" 
            width={220} 
            height={60} 
            className="object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/jobs" className="text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">
            Browse Jobs
          </Link>
          <Link href="/tradies" className="text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">
            Find Tradies
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <Link href="/post-job" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-tighter transition-all">
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  )
}