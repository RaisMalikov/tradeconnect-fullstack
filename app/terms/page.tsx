export default function TermsPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto text-slate-300">
      <h1 className="text-4xl font-black text-white mb-4">Terms and Conditions</h1>
      <p className="mb-8 text-slate-400 italic">Last Updated: May 2026</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-white">1. Our Service</h2>
          <p>TradieConnects provides a platform to connect homeowners with tradespeople in New Zealand. We are an intermediary and are not a party to any contract formed between users. We do not employ the tradies listed on our site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-white">2. Consumer Guarantees Act (CGA)</h2>
          <p>While TradieConnects is not the service provider, all tradies using this platform must comply with the Consumer Guarantees Act 1993. This means services must be provided with reasonable care and skill, and be fit for purpose.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-white">3. Fair Trading Act (FTA)</h2>
          <p>Users must not engage in misleading or deceptive conduct. Tradies must represent their qualifications, experience, and pricing accurately in accordance with the Fair Trading Act 1986.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-white">4. Liability</h2>
          <p>To the extent permitted by NZ law, TradieConnects is not liable for any faulty workmanship, damage to property, or financial loss resulting from a connection made on this platform. We recommend all homeowners verify insurance and licenses before work begins.</p>
        </section>
      </div>
    </main>
  )
}