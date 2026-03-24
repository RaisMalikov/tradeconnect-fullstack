import { SectionTitle } from '@/components/section-title';
import { TRADE_OPTIONS } from '@/lib/types';

export default function PostJobPage() {
  return (
    <div className="container-shell py-14">
      <SectionTitle eyebrow="Post a job" title="Create a job listing" description="This version includes the production-ready page structure. The submit action is ready to connect to Supabase next." />
      <form className="card mt-8 grid gap-5 p-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">Job title</label>
          <input className="input" placeholder="Example: Licensed electrician for office fit-off" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Trade</label>
          <select className="select">
            {TRADE_OPTIONS.map((trade) => <option key={trade}>{trade}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Location</label>
          <input className="input" placeholder="Auckland" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Budget</label>
          <input className="input" placeholder="$3,500 or Quote needed" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Urgency</label>
          <select className="select">
            <option>Urgent</option>
            <option>This week</option>
            <option>Planned</option>
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">Description</label>
          <textarea className="textarea" placeholder="Scope, timing, labour only or materials, access, and site details." />
        </div>
        <div className="lg:col-span-2 flex flex-wrap gap-3">
          <button type="button" className="button-primary">Submit job</button>
          <button type="button" className="button-secondary">Save draft</button>
        </div>
      </form>
    </div>
  );
}
