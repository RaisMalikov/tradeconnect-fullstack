"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  trade: string | null;
  location: string | null;
  phone: string | null;
  bio: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You are not logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        setMessage(error.message);
        return;
      }

      setProfile(data);
    }

    loadProfile();
  }, []);

  async function saveProfile() {
    if (!profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        trade: profile.trade,
        location: profile.location,
        phone: profile.phone,
        bio: profile.bio,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    setMessage(error ? error.message : "Profile updated.");
  }

  if (message && !profile) {
    return <main className="p-6">{message}</main>;
  }

  if (!profile) {
    return <main className="p-6">Loading...</main>;
  }

  return (
    <main className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <input
        className="w-full rounded border p-3 text-black"
        value={profile.full_name ?? ""}
        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
        placeholder="Full name"
      />
      <input
        className="w-full rounded border p-3 text-black"
        value={profile.trade ?? ""}
        onChange={(e) => setProfile({ ...profile, trade: e.target.value })}
        placeholder="Trade"
      />
      <input
        className="w-full rounded border p-3 text-black"
        value={profile.location ?? ""}
        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        placeholder="Location"
      />
      <input
        className="w-full rounded border p-3 text-black"
        value={profile.phone ?? ""}
        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        placeholder="Phone"
      />
      <textarea
        className="w-full rounded border p-3 text-black"
        value={profile.bio ?? ""}
        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        placeholder="Short bio"
      />

      <button
        onClick={saveProfile}
        className="rounded bg-blue-600 px-5 py-3 font-semibold text-white"
      >
        Save profile
      </button>

      {message && <p>{message}</p>}
    </main>
  );
}