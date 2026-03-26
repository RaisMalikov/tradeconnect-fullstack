"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Job = {
  id: string;
  title: string;
  description: string | null;
  trade_required: string | null;
  location: string | null;
  budget: number | null;
  created_at: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadJobs() {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        return;
      }

      setJobs(data || []);
    }

    loadJobs();
  }, []);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Jobs</h1>

      {message && <p className="mb-4">{message}</p>}

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <article key={job.id} className="rounded border p-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="mt-2">{job.description}</p>

              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <p><strong>Trade:</strong> {job.trade_required || "Not specified"}</p>
                <p><strong>Location:</strong> {job.location || "Not specified"}</p>
                <p><strong>Budget:</strong> {job.budget ?? "Not specified"}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}