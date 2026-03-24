import { Job, TradieProfile } from '@/lib/types';

export const fallbackJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Plasterboard fixer needed for 3-bedroom renovation',
    trade: 'Plasterboard',
    location: 'Auckland',
    description: 'Walls and ceilings for a residential renovation. Labour only. Start next week.',
    budget: '$4,500',
    urgency: 'This week',
    status: 'open',
    created_at: new Date().toISOString()
  },
  {
    id: 'job-2',
    title: 'Licensed plumber for bathroom refit',
    trade: 'Plumbing',
    location: 'Manukau',
    description: 'Shower, vanity, toilet reconnection. Must be certified.',
    budget: 'Quote needed',
    urgency: 'Urgent',
    status: 'open',
    created_at: new Date().toISOString()
  },
  {
    id: 'job-3',
    title: 'Electrical fit-off for small office',
    trade: 'Electrical',
    location: 'North Shore',
    description: 'Lights, power points, switchboard check. Commercial job.',
    budget: '$3,000',
    urgency: 'Planned',
    status: 'open',
    created_at: new Date().toISOString()
  }
];

export const fallbackTradies: TradieProfile[] = [
  {
    id: 'tradie-1',
    full_name: 'R. Malikov Interiors',
    trade: 'Plasterboard',
    service_area: 'Auckland',
    years_experience: 8,
    bio: 'Residential and commercial plasterboard fixing, ceilings, and renovation work.',
    verified: true,
    available_now: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'tradie-2',
    full_name: 'NorthFlow Plumbing',
    trade: 'Plumbing',
    service_area: 'North Shore',
    years_experience: 11,
    bio: 'Maintenance, renovations, and emergency plumbing.',
    verified: true,
    available_now: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'tradie-3',
    full_name: 'Sparkline Electrical',
    trade: 'Electrical',
    service_area: 'South Auckland',
    years_experience: 6,
    bio: 'Residential rewires, fit-off, smart home installs, and repairs.',
    verified: false,
    available_now: true,
    created_at: new Date().toISOString()
  }
];
