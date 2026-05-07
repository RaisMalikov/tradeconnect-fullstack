"use client";

import { sendEmail } from "@/lib/send-email";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  trade: string | null;
  location: string | null;
  phone: string | null;
  bio: string | null;
  email: string | null;
};

type Job = {
  id: string;
  title: string;
};

export default function TradiesPage() {
  const [tradies, setTradies] = useState<Profile[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [selectedJobs, setSelectedJobs] = useState<Record<string, string>>({});
  const [inviteMessages, setInviteMessages] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: tradieData, error: tradieError } = await supabase
      .from("profiles")
      .select("id, full_name, trade, location, phone, bio, email")
      .order("full_name", { ascending: true });

    if (tradieError) {
      setMessage(tradieError.message);
      setLoading(false);
      return;
    }

    setTradies(tradieData || []);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: jobData } = await supabase
        .from("jobs")
        .select("id, title")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setMyJobs(jobData || []);
    }

    setLoading(false);
  }

  async function inviteTradie(tradieId: string) {
    setStatus((prev) => ({ ...prev, [tradieId]: "Sending invitation..." }));

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStatus((prev) => ({ ...prev, [tradieId]: "Please log in first." }));
      return;
    }

    const jobId = selectedJobs[tradieId];

    if (!jobId) {
      setStatus((prev) => ({ ...prev, [tradieId]: "Please select a job first." }));
      return;
    }

    const customMessage = inviteMessages[tradieId] || "";

    const { error } = await supabase.from("invitations").insert({
      job_id: jobId,
      tradie_id: tradieId,
      client_id: user.id,
      message: customMessage,
      status: "pending",
    });

    if (error) {
      setStatus((prev) => ({ ...prev, [tradieId]: error.message }));
      return;
    }

    const invitedTradie = tradies.find((tradie) => tradie.id === tradieId);

    if (invitedTradie?.email) {
      await sendEmail(
        invitedTradie.email,
        "You received a job invitation on TradieConnectss",
        `A client invited you to apply for a job.\n\nMessage: ${
          customMessage || "No message"
        }`,
        "New job invitation",
        "View invitation",
        "https://tradeconnects.co.nz/my-invitations"
      );
    }

    setStatus((prev) => ({ ...prev, [tradieId]: "Invitation sent." }));
    setInviteMessages((prev) => ({ ...prev, [tradieId]: "" }));
  }

  const filteredTradies = useMemo(() => {
    return tradies.filter((tradie) => {
      const text = `${tradie.full_name || ""} ${tradie.trade || ""} ${
        tradie.location || ""
      } ${tradie.bio || ""}`.toLowerCase();

      return (
        text.includes(search.toLowerCase()) &&
        (!tradeFilter ||
          (tradie.trade || "")
            .toLowerCase()
            .includes(tradeFilter.toLowerCase())) &&
        (!locationFilter ||
          (tradie.location || "")
            .toLowerCase()
            .includes(locationFilter.toLowerCase()))
      );
    });
  }, [tradies, search, tradeFilter, locationFilter]);

  const tradeOptions = Array.from(
    new Set(tradies.map((tradie) => tradie.trade).filter(Boolean))
  ) as string[];

  const locationOptions = Array.from(
    new Set(tradies.map((tradie) => tradie.location).filter(Boolean))
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
          {tradeOptions.map((trade) => (
            <option key={trade} value={trade}>
              {trade}
            </option>
          ))}
        </select>

        <select
          className="rounded border p-3"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All locations</option>
          {locationOptions.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading tradies...</p>
      ) : filteredTradies.length === 0 ? (
        <p>No tradies found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTradies.map((tradie) => (
            <div key={tradie.id} className="rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">
                {tradie.full_name || "Unnamed tradie"}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {tradie.trade || "Trade not specified"} •{" "}
                {tradie.location || "Location not specified"}
              </p>

              <p className="mt-3 text-sm text-slate-700">
                {tradie.bio || "No bio provided."}
              </p>

              <div className="mt-5 border-t pt-4">
                <h3 className="font-semibold">Invite to a job</h3>

                {myJobs.length === 0 ? (
                  <p className="mt-2 text-sm text-slate-600">
                    Log in and post a job first to invite this tradie.
                  </p>
                ) : (
                  <div className="mt-3 space-y-3">
                    <select
                      className="w-full rounded border p-3"
                      value={selectedJobs[tradie.id] || ""}
                      onChange={(e) =>
                        setSelectedJobs((prev) => ({
                          ...prev,
                          [tradie.id]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select your job</option>
                      {myJobs.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.title}
                        </option>
                      ))}
                    </select>

                    <textarea
                      className="w-full rounded border p-3"
                      rows={3}
                      placeholder="Optional message"
                      value={inviteMessages[tradie.id] || ""}
                      onChange={(e) =>
                        setInviteMessages((prev) => ({
                          ...prev,
                          [tradie.id]: e.target.value,
                        }))
                      }
                    />

                    <button
                      onClick={() => inviteTradie(tradie.id)}
                      className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white"
                    >
                      Invite Tradie
                    </button>

                    {status[tradie.id] && (
                      <p className="text-sm text-green-600">{status[tradie.id]}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}