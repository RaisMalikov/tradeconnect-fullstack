"use client";

import { sendEmail } from "@/lib/send-email";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Application = {
  id: string;
  message: string | null;
  status: string | null;
  created_at: string;
  profiles?: {
    full_name: string | null;
    trade: string | null;
    location: string | null;
    phone: string | null;
    email: string | null;
  }[];
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
  const [loading, setLoading] = useState(true);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  useEffect(() => {
    loadMyJobs();
  }, []);

  async function loadMyJobs() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      setLoading(false);
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
          status,
          created_at,
          profiles (
            full_name,
            trade,
            location,
            phone,
            email
          )
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setJobs((data as unknown as Job[]) || []);
    setLoading(false);
  }

  async function deleteJob(jobId: string) {
    if (!confirm("Delete this job?")) return;

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setMessage("Job deleted.");
  }

  async function updateJob(job: Job) {
    const { error } = await supabase
      .from("jobs")
      .update({
        title: job.title,
        description: job.description,
        trade_required: job.trade_required,
        location: job.location,
        budget: job.budget,
      })
      .eq("id", job.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setEditingJobId(null);
    setMessage("Job updated.");
  }

  async function updateApplicationStatus(
    applicationId: string,
    newStatus: "accepted" | "declined"
  ) {
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", applicationId);

    if (error) {
      setMessage(error.message);
      return;
    }

    let email = "";
    let jobTitle = "";

    setJobs((prev) =>
      prev.map((job) => ({
        ...job,
        applications: job.applications.map((app) => {
          if (app.id === applicationId) {
            if (newStatus === "accepted") {
              email = app.profiles?.[0]?.email || "";
              jobTitle = job.title;
            }
            return { ...app, status: newStatus };
          }
          return app;
        }),
      }))
    );

    if (newStatus === "accepted" && email) {
      await sendEmail(
        email,
        "You were accepted on TradieConnectss",
        `You were accepted for: ${jobTitle}`,
        "Application accepted",
        "View job",
        "https://tradieconnects.co.nz/my-applications"
      );
    }

    setMessage("Application updated.");
  }

  return (
    <main className="mx-auto max-w-6xl p-6 text-black">
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold">My Jobs</h1>
        <Link
          href="/post-job"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Post Job
        </Link>
      </div>

      {message && <p className="mb-4">{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded">

              {editingJobId === job.id ? (
                <>
                  <input
                    className="w-full border p-2 mb-2"
                    value={job.title}
                    onChange={(e) =>
                      setJobs((prev) =>
                        prev.map((j) =>
                          j.id === job.id
                            ? { ...j, title: e.target.value }
                            : j
                        )
                      )
                    }
                  />

                  <textarea
                    className="w-full border p-2 mb-2"
                    value={job.description || ""}
                    onChange={(e) =>
                      setJobs((prev) =>
                        prev.map((j) =>
                          j.id === job.id
                            ? { ...j, description: e.target.value }
                            : j
                        )
                      )
                    }
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateJob(job)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingJobId(null)}
                      className="border px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-bold">{job.title}</h2>
                  <p>{job.description}</p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingJobId(job.id)}
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              <div className="mt-4">
                {job.applications.map((app) => (
                  <div key={app.id} className="border p-2 mt-2">
                    <p>{app.profiles?.[0]?.full_name}</p>

                    <button
                      onClick={() =>
                        updateApplicationStatus(app.id, "accepted")
                      }
                      className="bg-green-600 text-white px-2 py-1 mr-2"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateApplicationStatus(app.id, "declined")
                      }
                      className="bg-red-600 text-white px-2 py-1"
                    >
                      Decline
                    </button>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}