"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="flex items-center justify-between border-b bg-white p-4 text-black">
      <Link href="/" className="text-xl font-bold">
        TradieConnects
      </Link>

      <nav className="flex items-center gap-4 text-sm">
        <Link href="/tradies" className="hover:text-blue-600">
          Tradies
        </Link>

        <Link href="/jobs" className="hover:text-blue-600">
          Jobs
        </Link>

        <Link href="/post-job" className="hover:text-blue-600">
          Post a Job
        </Link>

        {!user ? (
          <>
            <Link href="/register" className="hover:text-blue-600">
              Register
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile" className="hover:text-blue-600">
              My Account
            </Link>

            <button
              onClick={logout}
              className="rounded border px-3 py-1 hover:bg-slate-100"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}