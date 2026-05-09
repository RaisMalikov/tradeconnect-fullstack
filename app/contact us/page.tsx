export default function ContactPage() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4">Get in Touch</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Have a question about the platform or need help with your account? Our NZ-based team is here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-400">Full Name</label>
              <input type="text" className="w-full" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-400">Email Address</label>
              <input type="email" className="w-full" placeholder="email@example.co.nz" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-400">How can we help?</label>
              <textarea className="w-full" rows={4} placeholder="Tell us what's on your mind..."></textarea>
            </div>
            <button className="w-full bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-orange-600/10 rounded-2xl flex items-center justify-center border border-orange-500/20">
              <span className="text-2xl">📍</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Location</h3>
              <p className="text-slate-400">Auckland, New Zealand</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-orange-600/10 rounded-2xl flex items-center justify-center border border-orange-500/20">
              <span className="text-2xl">📧</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Email</h3>
              <p className="text-slate-400">support@tradieconnects.co.nz</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}