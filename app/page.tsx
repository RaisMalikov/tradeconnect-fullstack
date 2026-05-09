import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <div className="relative px-6 pt-20 pb-32 text-center lg:pt-40">
        {/* Big Impact Headline */}
        <h1 className="text-6xl font-black tracking-tighter text-white sm:text-8xl mb-8">
          NZ TRADIES. <br/>
          <span className="text-orange-500">CONNECTED.</span>
        </h1>
        
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-12 font-medium">
          The heavy-duty platform for New Zealand's trades industry. 
          Get quotes, find work, and get the job sorted.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/post-job" className="bg-orange-600 text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Post a Job
          </Link>
          <Link href="/tradies" className="bg-slate-900 text-white border border-slate-700 px-12 py-5 rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Find Tradies
          </Link>
        </div>
      </div>

      {/* Modern Value Grid */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {['Local', 'Verified', 'Fast'].map((item, i) => (
            <div key={i} className="p-10 rounded-2xl bg-slate-900/30 border border-slate-800">
              <h3 className="text-orange-500 font-black text-2xl mb-2">{item}</h3>
              <p className="text-slate-400 font-medium">Built for the New Zealand market with local support and reliable results.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}