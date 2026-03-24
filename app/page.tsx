import Link from 'next/link';
import { JobCard } from '@/components/job-card';
import { SectionTitle } from '@/components/section-title';
import { TradieCard } from '@/components/tradie-card';
import { fallbackJobs, fallbackTradies } from '@/lib/mock-data';
import { TRADE_OPTIONS } from '@/lib/types';

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Built for real tradies</p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Get construction jobs directly. No recruiters. No middlemen.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              TradeConnect NZ helps homeowners, builders, and subcontractors post jobs and connect directly with local trades.
              Registration is free. Start in Auckland, then grow nationwide and into the app.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/post-job" className="button-primary">Post a Job</Link>
              <Link href="/register-tradie" className="button-secondary">Join as Tradie</Link>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 text-sm text-slate-400">
              {['Free registration', 'Mobile-first', 'Construction-focused', 'Ready for app later'].map((item) => (
                <span key={item} className="rounded-full border border-slate-700 px-3 py-2">{item}</span>
              ))}
            </div>
          </div>
          <div className="card grid gap-4 p-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Popular trades</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TRADE_OPTIONS.slice(0, 12).map((trade) => (
                  <span key={trade} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200">{trade}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['1', 'Post a job'],
                ['2', 'Get direct replies'],
                ['3', 'Hire the right tradie']
              ].map(([n, text]) => (
                <div key={n} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm font-semibold text-brand">Step {n}</p>
                  <p className="mt-2 text-sm text-slate-200">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell space-y-8">
          <SectionTitle eyebrow="Why this works" title="A focused construction marketplace" description="Built around trust, speed, and direct contact between the people who need work done and the people who can do it." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ['Construction-specific', 'Trades, urgency, labour only, full install, service area, and real job details.'],
              ['Fast trust signals', 'Verified badges, experience, portfolio-ready profiles, and later compliance uploads.'],
              ['Scales to app later', 'Next.js and Supabase foundation so you can move into React Native when ready.']
            ].map(([title, description]) => (
              <div key={title} className="card p-6">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 py-16">
        <div className="container-shell space-y-8">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle eyebrow="Live structure" title="Example jobs" description="These cards use fallback demo data now, but the project is wired for Supabase tables." />
            <Link href="/jobs" className="text-sm font-semibold text-brand">View all jobs</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {fallbackJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell space-y-8">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle eyebrow="Tradie directory" title="Example tradie profiles" description="Profile cards show the kind of trust markers and discovery flow you need for launch." />
            <Link href="/tradies" className="text-sm font-semibold text-brand">Browse tradies</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {fallbackTradies.map((tradie) => <TradieCard key={tradie.id} tradie={tradie} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
