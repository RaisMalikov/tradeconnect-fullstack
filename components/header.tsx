import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b bg-slate-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="TradieConnects Logo" 
            width={180} 
            height={50} 
            className="object-contain"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="text-sm font-medium text-slate-200 hover:text-white">
            Browse Jobs
          </Link>
          <Link href="/tradies" className="text-sm font-medium text-slate-200 hover:text-white">
            Find Tradies
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-slate-200 hover:text-white">
            How it Works
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild className="text-slate-200 hover:text-white hover:bg-slate-800">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white border-none">
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}