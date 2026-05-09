import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-[#111827]"> {/* Matched to logo box */}
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="TradieConnects" 
            width={240} 
            height={80} 
            className="object-contain"
            priority
          />
        </Link>

        <div className="flex items-center space-x-8">
          <Link href="/jobs" className="text-sm font-bold text-white uppercase tracking-widest hover:text-orange-500">
            Browse Jobs
          </Link>
          <Link href="/tradies" className="text-sm font-bold text-white uppercase tracking-widest hover:text-orange-500">
            Find Tradies
          </Link>
          <Link href="/post-job" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all">
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  )
}