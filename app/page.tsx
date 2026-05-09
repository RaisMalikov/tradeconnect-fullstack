import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 [background:radial-gradient(circle_at_center,#ea580c10_0,transparent_70%)]" />

      {/* 1. HERO SECTION: Big & Clear */}
      <section className="px-6 pt-24 pb-20 text-center lg:pt-32">
        <h1 className="text-6xl font-black tracking-tight text-white sm:text-8xl">
          NZ Jobs. <span className="text-orange-500">Sorted.</span>
        </h1>
        <p className="mt-8 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The heavy-duty marketplace for Kiwi homeowners and tradespeople. Post a job in seconds or grow your business today.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/post-job" className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-orange-900/20 transition-all hover:-translate-y-1">
            Post a Job Free
          </Link>
          <Link href="/tradies" className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-5 rounded-2xl font-bold border border-slate-700 transition-all">
            Find a Tradie
          </Link>
        </div>
      </section>

      {/* 2. THE "WHY" SECTION: Easy to read cards */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 transition-colors">
            <div className="text-4xl mb-4">🇳🇿</div>
            <h3 className="text-2xl font-bold mb-2">100% Kiwi</h3>
            <p className="text-slate-400">Built in New Zealand, for New Zealanders. Local support and local tradies.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 transition-colors">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-2xl font-bold mb-2">Verified Pros</h3>
            <p className="text-slate-400">Review ratings and past work before you hire. Quality guaranteed.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 transition-colors">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-2">Fast Results</h3>
            <p className="text-slate-400">Receive quotes and connect with available tradies within hours, not days.</p>
          </div>
        </div>
      </section>
    </main>
  )
}