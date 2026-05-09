import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl mb-6">
            Connecting NZ with <span className="text-orange-500">Trusted Tradies</span>
          </h1>
          <p className="text-lg leading-8 text-slate-400 mb-10">
            The simplest way to find local tradespeople or grow your trade business in New Zealand. 
            Reliable, fast, and local.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href="/post-job"
              className="rounded-full bg-orange-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-orange-900/40 hover:bg-orange-500 transition-all"
            >
              Post a Job
            </Link>
            <Link href="/tradies" className="text-sm font-bold leading-6 text-white hover:text-orange-400 transition-colors">
              Browse Tradies <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h3 className="text-orange-500 font-bold mb-2">01. Post</h3>
            <p className="text-slate-300">Tell us what you need done. It takes 60 seconds.</p>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h3 className="text-orange-500 font-bold mb-2">02. Connect</h3>
            <p className="text-slate-300">Local tradies view your job and get in touch.</p>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h3 className="text-orange-500 font-bold mb-2">03. Done</h3>
            <p className="text-slate-300">Review profiles, hire the best, and get it sorted.</p>
          </div>
        </div>
      </div>
    </main>
  )
}