export default function TradiesPage() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Find Tradies</h1>
      
      {/* Search Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <input placeholder="Search name..." className="w-full" />
        <input placeholder="Trade (e.g. Electrician)" className="w-full" />
        <input placeholder="Location" className="w-full" />
      </div>

      {/* Tradie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((tradie) => (
          <div key={tradie} className="bg-[#0f172a] p-6 rounded-3xl border border-slate-800 hover:border-orange-500/50 transition-all text-center">
            <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 border-2 border-orange-500/20 flex items-center justify-center">
               <span className="text-slate-500 text-xs">Photo</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Auckland Sparky Ltd</h3>
            <p className="text-orange-500 text-sm font-bold mb-4">Certified Electrician</p>
            <p className="text-slate-400 text-sm mb-6">15 years experience in residential and commercial wiring.</p>
            <button className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold border border-slate-700 hover:bg-slate-700 transition-all">
              Invite to Job
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}