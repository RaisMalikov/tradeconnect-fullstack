import { SectionTitle } from '@/components/section-title';

const stats = [
  ['Open jobs', '38'],
  ['Tradie profiles', '124'],
  ['Pending verifications', '9'],
  ['Flagged items', '2']
];

export default function AdminPage() {
  return (
    <div className="container-shell py-14">
      <SectionTitle eyebrow="Admin dashboard" title="Moderation and platform overview" description="This page is the structure for your future admin area: review users, monitor jobs, and manage trust." />
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="card p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white">Pending verifications</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>NorthBuild Plumbing — uploaded licence, insurance pending.</p>
            <p>WireRight Electrical — manual ID check required.</p>
            <p>WestCity Roofing — company status to confirm.</p>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white">Reported content</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>Job #219 — duplicate listing.</p>
            <p>Profile #88 — suspicious phone number formatting.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
