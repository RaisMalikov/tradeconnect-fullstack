"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/send-email";

type Profile = {
  id: string;
  full_name: string | null;
  trade: string | null;
  location: string | null;
  bio: string | null;
  email: string | null; // ✅ required
};

export default function TradiesPage() {
<<<<<<< HEAD
  const [tradies, setTradies] = useState<Profile[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [messages, setMessages] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    loadTradies();
  }, []);

  async function loadTradies() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, trade, location, phone, bio, email")
      .order("full_name", { ascending: true });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setTradies(data || []);
    setLoading(false);
  }

  async function inviteTradie(tradieId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStatus((prev) => ({ ...prev, [tradieId]: "Login required." }));
      return;
    }

    const customMessage = messages[tradieId] || "";

    const { error } = await supabase.from("invitations").insert({
      tradie_id: tradieId,
      client_id: user.id,
      message: customMessage,
    });

    if (error) {
      setStatus((prev) => ({ ...prev, [tradieId]: error.message }));
      return;
    }

    // 🔥 SEND EMAIL
    const invitedTradie = tradies.find((t) => t.id === tradieId);

    if (invitedTradie?.email) {
      await sendEmail(
        invitedTradie.email,
        "You received a job invitation on TradieConnect",
        `A client invited you to apply for a job.\n\nMessage: ${customMessage || "No message"}\n\nLog in to TradieConnect to view details.`
      );
    }

    setStatus((prev) => ({ ...prev, [tradieId]: "Invitation sent." }));
    setMessages((prev) => ({ ...prev, [tradieId]: "" }));
  }

  const filteredTradies = useMemo(() => {
    return tradies.filter((t) => {
      const text = `${t.full_name || ""} ${t.trade || ""} ${
        t.location || ""
      } ${t.bio || ""}`.toLowerCase();

      return (
        text.includes(search.toLowerCase()) &&
        (!tradeFilter ||
          (t.trade || "")
            .toLowerCase()
            .includes(tradeFilter.toLowerCase())) &&
        (!locationFilter ||
          (t.location || "")
            .toLowerCase()
            .includes(locationFilter.toLowerCase()))
      );
    });
  }, [tradies, search, tradeFilter, locationFilter]);

  const tradeOptions = Array.from(
    new Set(tradies.map((t) => t.trade).filter(Boolean))
  ) as string[];

  const locationOptions = Array.from(
    new Set(tradies.map((t) => t.location).filter(Boolean))
  ) as string[];

  return (
    <main className="mx-auto max-w-6xl p-6 text-black">
      <h1 className="mb-6 text-3xl font-bold">Tradies</h1>

      {message && <p className="mb-4 text-red-600">{message}</p>}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input
          className="rounded border p-3"
          placeholder="Search tradies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded border p-3"
          value={tradeFilter}
          onChange={(e) => setTradeFilter(e.target.value)}
        >
          <option value="">All trades</option>
          {tradeOptions.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          className="rounded border p-3"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All locations</option>
          {locationOptions.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading tradies...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTradies.map((tradie) => (
            <div key={tradie.id} className="rounded border p-4">
              <h2 className="text-xl font-semibold">
                {tradie.full_name || "Unnamed"}
              </h2>

              <p className="text-sm text-slate-600">
                {tradie.trade} • {tradie.location}
              </p>

              <p className="mt-2 text-sm">
                {tradie.bio || "No bio provided"}
              </p>

              <textarea
                className="mt-3 w-full rounded border p-2 text-sm"
                placeholder="Message (optional)"
                value={messages[tradie.id] || ""}
                onChange={(e) =>
                  setMessages((prev) => ({
                    ...prev,
                    [tradie.id]: e.target.value,
                  }))
                }
              />

              <button
                onClick={() => inviteTradie(tradie.id)}
                className="mt-3 w-full rounded bg-blue-600 py-2 text-white"
              >
                Invite
              </button>

              {status[tradie.id] && (
                <p className="mt-2 text-sm text-green-600">
                  {status[tradie.id]}
                </p>
              )}
            </div>
=======
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
>>>>>>> b2853355a6eac1510ed79a2fdc08202890ff94e2
          ))}
        </div>
      )}
    </main>
  );
}