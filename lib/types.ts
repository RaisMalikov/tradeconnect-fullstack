export async function sendEmail(to: string, subject: string, text: string) {
  await fetch("https://frwuyxtccadyrdnwotvo.functions.supabase.co/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      subject,
      text,
    }),
  });
}

export type Trade =
  | 'Plasterboard'
  | 'Painting'
  | 'Tiling'
  | 'Flooring'
  | 'Electrical'
  | 'Plumbing'
  | 'Roofing'
  | 'Framing'
  | 'Concrete'
  | 'HVAC'
  | 'Drainage'
  | 'Scaffolding'
  | 'Carpentry'
  | 'Insulation'
  | 'Landscaping'
  | 'Handyman'
  | 'Labourer';

export const TRADE_OPTIONS: Trade[] = [
  'Plasterboard',
  'Painting',
  'Tiling',
  'Flooring',
  'Electrical',
  'Plumbing',
  'Roofing',
  'Framing',
  'Concrete',
  'HVAC',
  'Drainage',
  'Scaffolding',
  'Carpentry',
  'Insulation',
  'Landscaping',
  'Handyman',
  'Labourer'
];

export interface Job {
  id: string;
  title: string;
  trade: Trade;
  location: string;
  description: string;
  budget: string | null;
  urgency: string;
  status: string;
  created_at: string;
}

export interface TradieProfile {
  id: string;
  full_name: string;
  trade: Trade;
  service_area: string;
  years_experience: number;
  bio: string | null;
  verified: boolean;
  available_now: boolean;
  created_at: string;
}
