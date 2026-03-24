import { Job } from '@/lib/types';

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{job.trade}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{job.title}</h3>
        </div>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">{job.urgency}</span>
      </div>
      <p className="mt-4 text-sm text-slate-300">{job.description}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
        <span>{job.location}</span>
        <span>•</span>
        <span>{job.budget ?? 'Quote needed'}</span>
        <span>•</span>
        <span>{job.status}</span>
      </div>
    </article>
  );
}
