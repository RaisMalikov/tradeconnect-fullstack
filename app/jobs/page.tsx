import { JobCard } from '@/components/job-card';
import { SectionTitle } from '@/components/section-title';
import { fallbackJobs } from '@/lib/mock-data';

export default function JobsPage() {
  return (
    <div className="container-shell py-14">
      <SectionTitle eyebrow="Jobs board" title="Find construction work" description="In the production version, filters and search will query live Supabase data." />
      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="card h-fit p-5">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <div className="mt-4 space-y-4">
            <input className="input" placeholder="Trade" />
            <input className="input" placeholder="Location" />
            <select className="select" defaultValue="">
              <option value="">Urgency</option>
              <option>Urgent</option>
              <option>This week</option>
              <option>Planned</option>
            </select>
            <button className="button-primary w-full">Apply filters</button>
          </div>
        </aside>
        <div className="grid gap-6">
          {fallbackJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
}
