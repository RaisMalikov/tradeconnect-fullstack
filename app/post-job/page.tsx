"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tradeRequired, setTradeRequired] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    const validFiles = selectedFiles.filter((file) => {
      const isAllowedType = allowedTypes.includes(file.type);
      const isAllowedSize = file.size <= 10 * 1024 * 1024;

      return isAllowedType && isAllowedSize;
    });

    if (validFiles.length !== selectedFiles.length) {
      setMessage("Some files were skipped. Only JPG, PNG, WEBP, and PDF under 10MB are allowed.");
    }

    setFiles(validFiles);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("Posting job...");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("Please log in first.");
      setLoading(false);
      return;
    }

    const { data: jobData, error: jobError } = await supabase
      .from("jobs")
      .insert({
        user_id: user.id,
        title,
        description,
        trade_required: tradeRequired,
        location,
        budget: budget ? Number(budget) : null,
      })
      .select("id")
      .single();

    if (jobError || !jobData) {
      setMessage(jobError?.message || "Could not create job.");
      setLoading(false);
      return;
    }

    for (const file of files) {
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${user.id}/${jobData.id}/${Date.now()}-${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("job-files")
        .upload(filePath, file);

      if (uploadError) {
        setMessage(uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("job-files")
        .getPublicUrl(filePath);

      const { error: fileRecordError } = await supabase.from("job_files").insert({
        job_id: jobData.id,
        user_id: user.id,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        public_url: publicUrlData.publicUrl,
      });

      if (fileRecordError) {
        setMessage(fileRecordError.message);
        setLoading(false);
        return;
      }
    }

    setTitle("");
    setDescription("");
    setTradeRequired("");
    setLocation("");
    setBudget("");
    setFiles([]);
    setMessage("Job posted successfully.");
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-2xl p-6 text-black">
      <h1 className="mb-6 text-3xl font-bold">Post a Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded border p-3"
          placeholder="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full rounded border p-3"
          placeholder="Describe the job"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Trade required"
          value={tradeRequired}
          onChange={(e) => setTradeRequired(e.target.value)}
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <div>
          <label className="mb-2 block font-semibold">
            Upload job photos or PDF
          </label>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={handleFilesChange}
            className="w-full rounded border p-3"
          />
          <p className="mt-1 text-sm text-slate-500">
            Allowed: JPG, PNG, WEBP, PDF. Max 10MB each.
          </p>
        </div>

        {files.length > 0 && (
          <div className="rounded border bg-slate-50 p-3 text-sm">
            <p className="font-semibold">Selected files:</p>
            <ul className="mt-2 list-disc pl-5">
              {files.map((file) => (
                <li key={file.name}>
                  {file.name} — {(file.size / 1024 / 1024).toFixed(2)} MB
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}