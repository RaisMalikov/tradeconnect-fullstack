"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tradeRequired, setTradeRequired] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setMessage("Please log in first.");
      return;
    }

    const { error } = await supabase.from("jobs").insert({
      user_id: user.id,
      title,
      description,
      trade_required: tradeRequired,
      location,
      budget: budget ? Number(budget) : null,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setTitle("");
    setDescription("");
    setTradeRequired("");
    setLocation("");
    setBudget("");
    setMessage("Job posted successfully.");
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Post a Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full rounded border p-3 text-black"
          placeholder="Describe the job"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />

        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Trade required (e.g. Plumber, Electrician)"
          value={tradeRequired}
          onChange={(e) => setTradeRequired(e.target.value)}
        />

        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}