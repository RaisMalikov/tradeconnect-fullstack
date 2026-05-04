"use client";

import { sendEmail } from "@/lib/send-email";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Job = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  trade_required: string | null;
  location: string | null;
  budget: number | null;
  profiles?: {
    email: string | null;
  } | null;
  job_files?: {
    id: string;
    public_url: string;
    file_type: string | null;
    file_name: string | null;
  }[];
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [applying, setApplying] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  async function loadJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select(`
        id,
        user_id,
        title,
        description,
        trade_required,
        location,
        budget,
        profiles (
          email
        ),
        job_files (
          id,
          public_url,
          file_type,
          file_name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setJobs((data as Job[]) || []);
    setLoading(false);
  }

  async function loadApplications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("applications")
      .select("job_id")
      .eq("user_id", user.id);

    setAppliedJobs(data?.map((a) => a.job_id) || []);
  }

  async function applyToJob(job: Job) {
    setApplying(job.id);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      setApplying(null);
      return;
    }

    if (appliedJobs.includes(job.id)) {
      setMessage("You already applied to this job.");
      setApplying(null);
      return;
    }

    const { error } = await supabase.from("applications").insert({
      job_id: job.id,
      user_id: user.id,
      message: "Interested in this job",
      status: "pending",
    });

    if (error) {
      setMessage(error.message);
      setApplying(null);
      return;
    }

    const ownerEmail = job.profiles?.email;

    if (ownerEmail) {
      await sendEmail(
        ownerEmail,
        "New application on TradieConnect",
        `A tradie has applied to your job: ${job.title}`,
        "New job application",
        "View applications",
        "https://tradeconnect-fullstack.vercel.app/my-jobs"
      );
    }

    setAppliedJobs((prev) => [...prev, job.id]);
    setMessage("Application sent successfully.");
    setApplying(null);
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const text = `${job.title} ${job.description || ""} ${
        job.trade_required || ""
      } ${job.location || ""}`.toLowerCase();

      return (
        text.includes(search.toLowerCase()) &&
        (!tradeFilter ||
          (job.trade_required || "")
            .toLowerCase()
            .includes(tradeFilter.toLowerCase())) &&
        (!locationFilter ||
          (job.location || "")
            .toLowerCase()
            .includes(locationFilter.toLowerCase()))
      );
    });
  }, [jobs, search, tradeFilter, locationFilter]);

  const tradeOptions = Array.from(
    new Set(jobs.map((j) => j.trade_required).filter(Boolean))
  ) as string[];

  const locationOptions = Array.from(
    new Set(jobs.map((j) => j.location).filter(Boolean))
  ) as string[];

  return (
    <main className="mx-auto max-w-6xl p-6 text-black">
      <h1 className="mb-6 text-3xl font-bold">Jobs</h1>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input
          className="rounded border p-3"
          placeholder="Search jobs..."
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
        <p>Loading jobs...</p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const alreadyApplied = appliedJobs.includes(job.id);

            return (
              <div key={job.id} className="rounded border p-4">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="mt-2">{job.description}</p>

                <p className="mt-2 text-sm text-slate-600">
                  {job.trade_required || "Trade not specified"} •{" "}
                  {job.location || "Location not specified"}
                </p>

                {/* 🔥 FILES DISPLAY */}
                {job.job_files && job.job_files.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-semibold">Attachments:</p>

                    <div className="flex flex-wrap gap-3">
                      {job.job_files.map((file) => {
                        const isImage = file.file_type?.startsWith("image");

                        return isImage ? (
                          <img
                            key={file.id}
                            src={file.public_url}
                            alt={file.file_name || "job image"}
                            className="h-32 w-32 rounded object-cover border"
                          />
                        ) : (
                          <a
                            key={file.id}
                            href={file.public_url}
                            target="_blank"
                            className="text-blue-600 underline text-sm"
                          >
                            {file.file_name || "View file"}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    disabled={alreadyApplied || applying === job.id}
                    onClick={() => applyToJob(job)}
                    className={`rounded px-4 py-2 text-white ${
                      alreadyApplied
                        ? "bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {alreadyApplied
                      ? "Applied"
                      : applying === job.id
                      ? "Applying..."
                      : "Apply for this job"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}