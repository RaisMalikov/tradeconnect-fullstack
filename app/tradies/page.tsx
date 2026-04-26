"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  trade: string | null;
  location: string | null;
  phone: string | null;
  bio: string | null;
};

export default function TradiesPage() {
  const [tradies, setTradies] = useState<Profile[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTradies() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, trade, location, phone, bio")
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      setTradies(data || []);
      setLoading(false);
    }

    loadTradies();
  }, []);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tradies</h1>
        <p className="mt-2 text-slate-600">
          Browse tradies on TradieConnect. Always check credentials, licences,
          and insurance before hiring.
        </p>
      </div>

      {loading && <p>Loading tradies...</p>}

      {message && <p className="mb-4 text-red-600">{message}</p>}

      {!loading && tradies.length === 0 ? (
        <p>No tradies registered yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tradies.map((tradie) => (
            <article key={tradie.id} className="rounded border p-5">
              <h2 className="text-xl font-semibold">
                {tradie.full_name || "Unnamed tradie"}
              </h2>

              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <p>
                  <strong>Trade:</strong>{" "}
                  {tradie.trade || "Not specified"}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {tradie.location || "Not specified"}
                </p>
              </div>

              {tradie.bio && <p className="mt-4">{tradie.bio}</p>}

              {tradie.phone && (
                <p className="mt-4 text-sm">
                  <strong>Phone:</strong> {tradie.phone}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}