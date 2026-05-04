"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Application = {
  id: string;
  message: string | null;
  created_at: string;
  jobs?: {
    title: string;
    location: string | null;
    trade_required: string | null;
  }[];
};

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("applications")
      .select(`
        id,
        message,
        created_at,
        jobs (
          title,
          location,
          trade_required
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setApplications((data as unknown as Application[]) || []);
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-4xl p-6 text-black">
      <h1 className="mb-6 text-3xl font-bold">My Applications</h1>

      {message && <p className="mb-4 text-red-600">{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const job = app.jobs?.[0];

            return (
              <div key={app.id} className="rounded border p-4">
                <h2 className="text-xl font-semibold">
                  {job?.title || "Job not found"}
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  {job?.trade_required || "Trade not specified"} •{" "}
                  {job?.location || "Location not specified"}
                </p>

                <p className="mt-2 text-sm">
                  {app.message || "No message"}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Applied: {new Date(app.created_at).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}