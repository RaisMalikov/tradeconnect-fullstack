import { SectionTitle } from '@/components/section-title';
import { TRADE_OPTIONS } from '@/lib/types';

export default function RegisterTradiePage() {
  return (
    <div className="container-shell py-14">
      <SectionTitle eyebrow="Free registration" title="Create your tradie profile" description="This is the entry point for tradies, subcontractors, labourers, and crews." />
      <form className="card mt-8 grid gap-5 p-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Full name or business name</label>
          <input className="input" placeholder="Example: SouthBuild Electrical" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Trade</label>
          <select className="select">
            {TRADE_OPTIONS.map((trade) => <option key={trade}>{trade}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Service area</label>
          <input className="input" placeholder="South Auckland" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Years of experience</label>
          <input className="input" placeholder="5" />
        </div>
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">Short bio</label>
          <textarea className="textarea" placeholder="What jobs you do best, what areas you cover, and what makes you reliable." />
        </div>
        <div className="lg:col-span-2 flex flex-wrap gap-3">
          <button type="button" className="button-primary">Create profile</button>
          <button type="button" className="button-secondary">Upload docs later</button>
        </div>
      </form>
    </div>
  );
}
