import { SectionTitle } from '@/components/section-title';
import { TradieCard } from '@/components/tradie-card';
import { fallbackTradies } from '@/lib/mock-data';

export default function TradiesPage() {
  return (
    <div className="container-shell py-14">
      <SectionTitle eyebrow="Tradie directory" title="Browse local trades" description="Search by trade, area, verification status, and availability in the live version." />
      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="card h-fit p-5">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <div className="mt-4 space-y-4">
            <input className="input" placeholder="Trade" />
            <input className="input" placeholder="Service area" />
            <select className="select" defaultValue="">
              <option value="">Availability</option>
              <option>Available now</option>
              <option>Busy currently</option>
            </select>
            <button className="button-primary w-full">Apply filters</button>
          </div>
        </aside>
        <div className="grid gap-6">
          {fallbackTradies.map((tradie) => <TradieCard key={tradie.id} tradie={tradie} />)}
        </div>
      </div>
    </div>
  );
}
