# TradieConnect NZ — Full-Stack Starter

This is a production-oriented starter for your construction jobs marketplace.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (database, auth, storage later)

## Included now
- marketing homepage
- jobs board page
- tradie directory page
- post job page
- tradie registration page
- admin dashboard UI shell
- reusable components
- trade category structure
- Supabase client helper
- SQL schema starter

## What still needs to be connected next
- real auth flows
- live create/read/update/delete with Supabase
- row level security policies
- messaging
- file uploads
- verification workflow
- payments / premium features later

## Local setup
1. Install Node.js 20+
2. Create a Supabase project
3. Copy `.env.example` to `.env.local`
4. Add your Supabase URL and anon key
5. Run:

```bash
npm install
npm run dev
```

6. Open `http://localhost:3000`

## Database setup
Run the SQL in `supabase/schema.sql` inside your Supabase SQL editor.

## Suggested next build order
1. Auth
2. Live jobs CRUD
3. Live tradie profiles CRUD
4. Applications table
5. Messaging
6. Admin moderation
7. Verification uploads
8. React Native app later
