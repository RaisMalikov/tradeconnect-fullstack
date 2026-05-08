import Link from "next/link";

export default function HomePage() {
  return (
    <main className="text-black">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-block rounded-full border px-4 py-2 text-sm text-slate-600">
              Built for New Zealand trade work
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Find tradies fast in Auckland
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              Post a job, invite tradies, receive applications, and connect directly.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/post-job"
                className="rounded bg-blue-600 px-6 py-3 font-semibold text-white"
              >
                Post a Job
              </Link>

              <Link
                href="/tradies"
                className="rounded border px-6 py-3 font-semibold text-black"
              >
                Browse Tradies
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              TradieConnects connects clients and tradies. Always check licences and credentials.
            </p>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">How it works</h2>

            <div className="mt-6 space-y-4">
              <div>
                <p className="font-semibold">1. Post your job</p>
                <p className="text-sm text-slate-600">
                  Describe your job, location and budget.
                </p>
              </div>

              <div>
                <p className="font-semibold">2. Get responses</p>
                <p className="text-sm text-slate-600">
                  Tradies apply or you invite them directly.
                </p>
              </div>

              <div>
                <p className="font-semibold">3. Choose and connect</p>
                <p className="text-sm text-slate-600">
                  Accept a tradie and contact them directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}