"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Application = {
  id: string;
  message: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    trade: string | null;
    location: string | null;
    phone: string | null;
  } | null;
};

type Job = {
  id: string;
  title: string;
  description: string | null;
  trade_required: string | null;
  location: string | null;
  budget: number | null;
  created_at: string;
  applications: Application[];
};

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMyJobs() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Please log in first.");
        return;
      }

      const { data, error } = await supabase
        .from("jobs")
        .select(`
          id,
          title,
          description,
          trade_required,
          location,
          budget,
          created_at,
          applications (
            id,
            message,
            created_at,
            profiles (
              full_name,
              trade,
              location,
              phone
            )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        return;
      }

      setJobs((data as Job[]) || []);
    }

    loadMyJobs();
  }, []);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Posted Jobs</h1>

      {message && <p className="mb-4">{message}</p>}

      {jobs.length === 0 ? (
        <p>You have not posted any jobs yet.</p>
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

              <div className="mt-5 border-t pt-4">
                <h3 className="mb-3 text-lg font-semibold">Applications</h3>

                {job.applications?.length ? (
                  <div className="space-y-3">
                    {job.applications.map((application) => (
                      <div key={application.id} className="rounded border p-3">
                        <p>
                          <strong>Name:</strong>{" "}
                          {application.profiles?.full_name || "Not provided"}
                        </p>
                        <p>
                          <strong>Trade:</strong>{" "}
                          {application.profiles?.trade || "Not provided"}
                        </p>
                        <p>
                          <strong>Location:</strong>{" "}
                          {application.profiles?.location || "Not provided"}
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {application.profiles?.phone || "Not provided"}
                        </p>
                        <p className="mt-2">
                          <strong>Message:</strong>{" "}
                          {application.message || "No message"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No applications yet.</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}