export default function JobsPage() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Available Jobs</h1>
      
      {/* Search Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <input placeholder="What job are you looking for?" className="w-full" />
        <input placeholder="Location (e.g. Wellington)" className="w-full" />
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {[1, 2, 3].map((job) => (
          <div key={job} className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800 hover:border-orange-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-orange-500">Kitchen Renovation</h3>
                <p className="text-slate-400">Ponsonby, Auckland • Posted 2h ago</p>
              </div>
              <span className="bg-orange-600/10 text-orange-500 px-4 py-1 rounded-full text-sm font-bold border border-orange-500/20">
                Urgent
              </span>
            </div>
            <p className="text-slate-300 mb-6">Need a certified plumber to install a new island sink and dishwasher. All materials provided...</p>
            <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-500 transition-all">
              View Details
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}