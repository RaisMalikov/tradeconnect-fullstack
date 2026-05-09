export default function PrivacyPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto text-slate-300">
      <h1 className="text-4xl font-black text-white mb-4">Privacy Policy</h1>
      <p className="mb-8 text-slate-400">In accordance with the New Zealand Privacy Act 2020.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-white">Data Collection</h2>
          <p>We collect information to help connect you with local services. This includes your name, contact details, and job location. We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-white">Your Rights</h2>
          <p>Under the Privacy Act 2020, you have the right to request access to and correction of any personal information we hold about you. Contact us at any time to update your details.</p>
        </section>
      </div>
    </main>
  )
}