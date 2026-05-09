import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Subtle Background Glow Effect */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#ea580c] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-4xl px-6 py-32 sm:py-48 lg:py-56 text-center">
        {/* Trust Badge - FIXED LINK HERE */}
        <div className="mb-8 flex justify-center">
          <div className="relative rounded-full px-4 py-1 text-sm leading-6 text-slate-300 ring-1 ring-slate-700/50 hover:ring-orange-500/50 transition-colors bg-slate-800/40 backdrop-blur-sm">
            Proudly connecting Kiwis nationwide. <Link href="/tradies" className="font-semibold text-orange-500"><span className="absolute inset-0" aria-hidden="true"></span>Find a tradie <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>

        <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl mb-8 leading-tight">
          Find the right <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Tradie</span> for the job, instantly.
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-400 mb-10">
          The simplest way to hire verified tradespeople or grow your trade business in New Zealand. No hidden fees, just reliable local connections.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/post-job"
            className="w-full sm:w-auto rounded-full bg-orange-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:bg-orange-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] transition-all transform hover:-translate-y-1"
          >
            Post a Job
          </Link>
          <Link 
            href="/tradies" 
            className="w-full sm:w-auto rounded-full bg-slate-800 border border-slate-700 px-8 py-4 text-sm font-bold text-white hover:bg-slate-700 hover:border-slate-500 transition-all"
          >
            Browse Tradies
          </Link>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
              <span className="text-orange-500 font-black text-xl">1</span>
            </div>
            <h3 className="text-xl text-white font-bold mb-3">Post Your Job</h3>
            <p className="text-slate-400 leading-relaxed">Tell us what you need done. Add photos and details in under 60 seconds.</p>
          </div>

          {/* Card 2 */}
          <div className="group bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
              <span className="text-orange-500 font-black text-xl">2</span>
            </div>
            <h3 className="text-xl text-white font-bold mb-3">Get Connected</h3>
            <p className="text-slate-400 leading-relaxed">Local, available tradies will view your job and reach out with quotes.</p>
          </div>

          {/* Card 3 */}
          <div className="group bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
              <span className="text-orange-500 font-black text-xl">3</span>
            </div>
            <h3 className="text-xl text-white font-bold mb-3">Get it Done</h3>
            <p className="text-slate-400 leading-relaxed">Compare profiles, read reviews, hire the best fit, and get it sorted.</p>
          </div>
        </div>
      </div>
    </div>
  )
}