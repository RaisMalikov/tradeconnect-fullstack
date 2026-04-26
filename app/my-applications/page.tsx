"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Application = {
  id: string;
  message: string | null;
  created_at: string;
  jobs: {
    title: string;
    location: string | null;
    trade_required: string | null;
  } | null;
};

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadApplications() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Please log in first.");
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
        return;
      }

      setApplications((data as Application[]) || []);
    }

    loadApplications();
  }, []);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Applications</h1>

      {message && <p className="mb-4">{message}</p>}

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <article key={application.id} className="rounded border p-4">
              <h2 className="text-xl font-semibold">
                {application.jobs?.title || "Unknown job"}
              </h2>

              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <p>
                  <strong>Trade:</strong>{" "}
                  {application.jobs?.trade_required || "Not specified"}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {application.jobs?.location || "Not specified"}
                </p>
              </div>

              <p className="mt-3">
                <strong>Your message:</strong> {application.message || "No message"}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}