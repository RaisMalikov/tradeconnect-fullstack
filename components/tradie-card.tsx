import { TradieProfile } from '@/lib/types';

export function TradieCard({ tradie }: { tradie: TradieProfile }) {
  return (
    <article className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{tradie.trade}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{tradie.full_name}</h3>
        </div>
        {tradie.verified ? (
          <span className="rounded-full border border-emerald-700 bg-emerald-900/30 px-3 py-1 text-xs text-emerald-300">Verified</span>
        ) : null}
      </div>
      <p className="mt-4 text-sm text-slate-300">{tradie.bio ?? 'No bio yet.'}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
        <span>{tradie.service_area}</span>
        <span>•</span>
        <span>{tradie.years_experience} years</span>
        <span>•</span>
        <span>{tradie.available_now ? 'Available now' : 'Busy currently'}</span>
      </div>
    </article>
  );
}
