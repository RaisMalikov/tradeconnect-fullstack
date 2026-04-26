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
  const [applyMessages, setApplyMessages] = useState<Record<string, string>>({});
  const [applyStatus, setApplyStatus] = useState<Record<string, string>>({});

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

  async function handleApply(jobId: string) {
    setApplyStatus((prev) => ({ ...prev, [jobId]: "Submitting..." }));

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setApplyStatus((prev) => ({ ...prev, [jobId]: userError.message }));
      return;
    }

    if (!user) {
      setApplyStatus((prev) => ({ ...prev, [jobId]: "Please log in first." }));
      return;
    }

    const { error } = await supabase.from("applications").insert({
      job_id: jobId,
      user_id: user.id,
      message: applyMessages[jobId] || "",
    });

    if (error) {
      setApplyStatus((prev) => ({ ...prev, [jobId]: error.message }));
      return;
    }

    setApplyStatus((prev) => ({ ...prev, [jobId]: "Applied successfully." }));
    setApplyMessages((prev) => ({ ...prev, [jobId]: "" }));
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Jobs</h1>

      {message && <p className="mb-4">{message}</p>}

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <article key={job.id} className="rounded border p-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="mt-2">{job.description}</p>

              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <p><strong>Trade:</strong> {job.trade_required || "Not specified"}</p>
                <p><strong>Location:</strong> {job.location || "Not specified"}</p>
                <p><strong>Budget:</strong> {job.budget ?? "Not specified"}</p>
              </div>

              <div className="mt-4 space-y-3 border-t pt-4">
                <h3 className="font-semibold">Apply for this job</h3>

                <textarea
                  className="w-full rounded border p-3 text-black"
                  rows={3}
                  placeholder="Write a short message"
                  value={applyMessages[job.id] || ""}
                  onChange={(e) =>
                    setApplyMessages((prev) => ({
                      ...prev,
                      [job.id]: e.target.value,
                    }))
                  }
                />

                <button
                  onClick={() => handleApply(job.id)}
                  className="rounded bg-blue-600 px-4 py-2 font-semibold text-white"
                >
                  Apply
                </button>

                {applyStatus[job.id] && (
                  <p className="text-sm">{applyStatus[job.id]}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}