"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Invitation = {
  id: string;
  message: string | null;
  status: string | null;
  created_at: string;
  jobs?: {
    title: string;
    description: string | null;
    location: string | null;
    trade_required: string | null;
    budget: number | null;
  }[];
};

export default function MyInvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvitations();
  }, []);

  async function loadInvitations() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("invitations")
      .select(`
        id,
        message,
        status,
        created_at,
        jobs (
          title,
          description,
          location,
          trade_required,
          budget
        )
      `)
      .eq("tradie_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setInvitations((data as unknown as Invitation[]) || []);
    setLoading(false);
  }

  async function updateStatus(invitationId: string, newStatus: string) {
    const { error } = await supabase
      .from("invitations")
      .update({ status: newStatus })
      .eq("id", invitationId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setInvitations((prev) =>
      prev.map((invitation) =>
        invitation.id === invitationId
          ? { ...invitation, status: newStatus }
          : invitation
      )
    );

    setMessage(`Invitation ${newStatus}.`);
  }

  return (
    <main className="mx-auto max-w-5xl p-6 text-black">
      <h1 className="mb-6 text-3xl font-bold">My Invitations</h1>

      {message && <p className="mb-4 text-red-600">{message}</p>}

      {loading ? (
        <p>Loading invitations...</p>
      ) : invitations.length === 0 ? (
        <p>No invitations yet.</p>
      ) : (
        <div className="space-y-4">
          {invitations.map((invitation) => {
            const job = invitation.jobs?.[0];

            return (
              <article key={invitation.id} className="rounded border p-4">
                <h2 className="text-xl font-semibold">
                  {job?.title || "Unknown job"}
                </h2>

                <p className="mt-2">{job?.description || "No description"}</p>

                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>
                    <strong>Trade:</strong>{" "}
                    {job?.trade_required || "Not specified"}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {job?.location || "Not specified"}
                  </p>
                  <p>
                    <strong>Budget:</strong>{" "}
                    {job?.budget ?? "Not specified"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {invitation.status || "pending"}
                  </p>
                </div>

                <p className="mt-3">
                  <strong>Client message:</strong>{" "}
                  {invitation.message || "No message"}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => updateStatus(invitation.id, "accepted")}
                    disabled={invitation.status === "accepted"}
                    className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(invitation.id, "declined")}
                    disabled={invitation.status === "declined"}
                    className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
                  >
                    Decline
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}