"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!acceptedTerms) {
      setMessage("You must accept the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    setMessage("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // 🔥 IMPORTANT: do NOT create profile here

    setMessage(
      "Account created. Check your email to confirm, then log in and complete your profile."
    );
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-xl p-6 text-black">
      <h1 className="mb-6 text-3xl font-bold">Create Account</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full rounded border p-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="flex gap-3 text-sm">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            required
          />
          <span>
            I agree to the{" "}
            <a href="/terms" className="underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}