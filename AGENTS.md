# TradieConnect Agent Instructions

You are helping build TradieConnect, a New Zealand marketplace connecting clients and tradies.

Stack:
- Next.js App Router
- TypeScript
- Supabase
- Vercel
- Tailwind CSS

Rules:
- Do not delete working features unless asked.
- Keep all route folders lowercase.
- Use `import { supabase } from "@/lib/supabase";`
- Never hardcode Supabase keys.
- Use environment variables only.
- Every Supabase table must use RLS.
- Do not claim tradies are verified, licensed, insured, or approved unless a real verification system exists.
- Keep TradieConnect positioned as a marketplace platform, not an employer or contractor.
- Before finishing, run `npm run build`.
- Fix all build errors before opening a PR.

Current routes:
- /
- /login
- /register
- /profile
- /jobs
- /post-job
- /tradies
- /my-jobs
- /my-applications