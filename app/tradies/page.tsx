import React from 'react'

export default function TradiesPage() {
  return (
    <main className="min-h-screen bg-[#111827] pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Page Title */}
        <h1 className="text-4xl font-black text-white mb-8 tracking-tight">Tradies</h1>

        {/* Search Bar Row (Fixed white-on-white text) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <input 
            className="w-full p-4 rounded-xl border border-slate-700 bg-[#1f2937] text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            placeholder="Search tradies..."
          />
          <input 
            className="w-full p-4 rounded-xl border border-slate-700 bg-[#1f2937] text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            placeholder="Trade (e.g. Plumber, Builder)"
          />
          <input 
            className="w-full p-4 rounded-xl border border-slate-700 bg-[#1f2937] text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            placeholder="Location (e.g. Auckland)"
          />
        </div>

        {/* Tradie Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-[#1f2937] border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col hover:border-slate-500 transition-colors">
            {/* Image Placeholder */}
            <div className="h-48 bg-slate-800 rounded-xl mb-6 w-full flex items-center justify-center border border-slate-700/50">
              <span className="text-slate-500 text-sm font-medium">No Image Provided</span>
            </div> 
            
            <h3 className="text-xl font-bold text-white mb-4">John's Plumbing</h3>
            
            <textarea 
              className="w-full p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm mb-6 flex-grow outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-500 resize-none"
              placeholder="Optional message..."
              rows={3}
            />
            
            <button className="w-full bg-[#3b82f6] hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
              Invite Tradie
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1f2937] border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col hover:border-slate-500 transition-colors">
            <div className="h-48 bg-slate-800 rounded-xl mb-6 w-full flex items-center justify-center border border-slate-700/50">
               <span className="text-slate-500 text-sm font-medium">No Image Provided</span>
            </div> 
            <h3 className="text-xl font-bold text-white mb-4">Elite Electrical NZ</h3>
            <textarea 
              className="w-full p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm mb-6 flex-grow outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-500 resize-none"
              placeholder="Optional message..."
              rows={3}
            />
            <button className="w-full bg-[#3b82f6] hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
              Invite Tradie
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}