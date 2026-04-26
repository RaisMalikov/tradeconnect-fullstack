"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  trade: string | null;
  location: string | null;
  bio: string | null;
};

export default function TradiesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfiles() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, trade, location, bio")
          .order("full_name", { ascending: true });

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        setProfiles(data || []);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    }

    loadProfiles();
  }, []);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Directory of Tradies</h1>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-600">Loading tradies...</p>
      ) : profiles.length === 0 ? (
        <p className="text-slate-600">No tradies in the directory yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <article
              key={profile.id}
              className="rounded border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {profile.full_name || "Unnamed"}
              </h2>

              {profile.trade && (
                <p className="mt-2 text-sm font-medium text-blue-600">
                  {profile.trade}
                </p>
              )}

              {profile.location && (
                <p className="mt-1 text-sm text-slate-600">📍 {profile.location}</p>
              )}

              {profile.bio && (
                <p className="mt-3 text-sm text-slate-700">{profile.bio}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );}