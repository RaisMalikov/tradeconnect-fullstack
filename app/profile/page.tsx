"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  trade: string | null;
  location: string | null;
  phone: string | null;
  bio: string | null;
  avatar_url: string | null;
};

type FileItem = {
  id: string;
  public_url: string;
  file_type: string | null;
  file_name: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      setLoading(false);
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profileData) {
      const { data: newProfile, error } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          email: user.email,
          full_name: "",
          trade: "",
          location: "",
          phone: "",
          bio: "",
        })
        .select("*")
        .single();

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      setProfile(newProfile);
    } else {
      setProfile(profileData);
    }

    const { data: fileData } = await supabase
      .from("profile_files")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setFiles(fileData || []);
    setLoading(false);
  }

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
        avatar_url: profile.avatar_url,
      })
      .eq("id", profile.id);

    setMessage(error ? error.message : "Profile saved.");
  }

  async function uploadAvatar() {
    if (!avatarFile || !profile) return;

    const safeName = avatarFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `${profile.id}/avatar-${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-files")
      .upload(path, avatarFile);

    if (uploadError) {
      setMessage(uploadError.message);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("profile-files")
      .getPublicUrl(path);

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: urlData.publicUrl })
      .eq("id", profile.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setProfile({ ...profile, avatar_url: urlData.publicUrl });
    setAvatarFile(null);
    setMessage("Profile photo updated.");
  }

  async function uploadPortfolioFiles() {
    if (!profile || selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const path = `${profile.id}/portfolio-${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-files")
        .upload(path, file);

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("profile-files")
        .getPublicUrl(path);

      await supabase.from("profile_files").insert({
        user_id: profile.id,
        file_name: file.name,
        file_path: path,
        file_type: file.type,
        file_size: file.size,
        public_url: urlData.publicUrl,
      });
    }

    setSelectedFiles([]);
    setMessage("Portfolio uploaded.");
    loadProfile();
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  async function deleteAccount() {
    const confirmDelete = confirm(
      "⚠️ This will permanently delete your account and all data. Continue?"
    );

    if (!confirmDelete) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage("Not logged in.");
      return;
    }

    const res = await fetch(
      "https://frwuyxtccadyrdnwotvo.functions.supabase.co/delete-account",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      setMessage(text);
      return;
    }

    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return <main className="p-6 text-black">Loading...</main>;
  }

  if (!profile) {
    return <main className="p-6 text-black">{message}</main>;
  }

  return (
    <main className="mx-auto max-w-6xl p-6 text-black">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="mt-2 text-slate-600">
            Manage your profile, jobs, applications and invitations.
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={logout} className="rounded border px-4 py-2">
            Logout
          </button>

          <button
            onClick={deleteAccount}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Delete Account
          </button>
        </div>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-4">
        <Link href="/post-job" className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Post a Job</h2>
          <p className="mt-2 text-sm text-slate-600">Create a new job listing.</p>
        </Link>

        <Link href="/my-jobs" className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold">My Jobs</h2>
          <p className="mt-2 text-sm text-slate-600">Manage jobs you posted.</p>
        </Link>

        <Link href="/my-applications" className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold">My Applications</h2>
          <p className="mt-2 text-sm text-slate-600">Jobs you applied for.</p>
        </Link>

        <Link href="/my-invitations" className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold">My Invitations</h2>
          <p className="mt-2 text-sm text-slate-600">Invites from clients.</p>
        </Link>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Profile Photo</h2>

          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Profile photo"
              className="mb-4 h-32 w-32 rounded-full border object-cover"
            />
          ) : (
            <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border bg-slate-100 text-sm text-slate-500">
              No photo
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            className="w-full rounded border p-3"
          />

          <button
            onClick={uploadAvatar}
            className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
          >
            Upload Profile Photo
          </button>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Profile Details</h2>

          <div className="space-y-3">
            <input
              className="w-full rounded border p-3"
              value={profile.full_name ?? ""}
              onChange={(e) =>
                setProfile({ ...profile, full_name: e.target.value })
              }
              placeholder="Full name"
            />

            <input
              className="w-full rounded border p-3"
              value={profile.trade ?? ""}
              onChange={(e) =>
                setProfile({ ...profile, trade: e.target.value })
              }
              placeholder="Trade"
            />

            <input
              className="w-full rounded border p-3"
              value={profile.location ?? ""}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
              placeholder="Location"
            />

            <input
              className="w-full rounded border p-3"
              value={profile.phone ?? ""}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <textarea
              className="w-full rounded border p-3"
              value={profile.bio ?? ""}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              placeholder="Short bio"
              rows={4}
            />

            <button
              onClick={saveProfile}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Portfolio / Documents</h2>

        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
          className="w-full rounded border p-3"
        />

        <button
          onClick={uploadPortfolioFiles}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Upload Portfolio Files
        </button>

        <div className="mt-6 flex flex-wrap gap-4">
          {files.map((file) =>
            file.file_type?.startsWith("image") ? (
              <img
                key={file.id}
                src={file.public_url}
                alt={file.file_name || "portfolio image"}
                className="h-28 w-28 rounded border object-cover"
              />
            ) : (
              <a
                key={file.id}
                href={file.public_url}
                target="_blank"
                className="text-blue-600 underline"
              >
                {file.file_name || "View file"}
              </a>
            )
          )}
        </div>
      </section>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}