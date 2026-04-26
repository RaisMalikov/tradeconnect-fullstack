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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("Posting job...");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setMessage(userError.message);
        setLoading(false);
        return;
      }

      if (!user) {
        setMessage("Please log in first.");
        setLoading(false);
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

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      setTitle("");
      setDescription("");
      setTradeRequired("");
      setLocation("");
      setBudget("");
      setMessage("Job posted successfully.");
    } catch (err) {
      console.error("Post job error:", err);
      setMessage("Something went wrong while posting the job.");
    } finally {
      setLoading(false);
    }
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
          placeholder="Trade required"
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