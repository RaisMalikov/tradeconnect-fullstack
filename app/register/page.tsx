"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [trade, setTrade] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Creating account...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const user = data.user;
    if (!user) {
      setMessage("Check your email to confirm your account.");
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: fullName,
      trade,
      location,
    });

    if (profileError) {
      setMessage(profileError.message);
      return;
    }

    setMessage("Account created successfully.");
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Create Tradie Profile</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Trade"
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
        />
        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-3 text-black"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="rounded bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          Create account
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}