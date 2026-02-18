import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { API_URL, getAuthToken } from "../../../lib/api";

type Props = {
  eventId: string | number;
  eventTitle: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function DeleteConfirmDialog({ eventId, eventTitle, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete event");
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Delete Event</h3>
            <p className="text-slate-400 text-sm">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">"{eventTitle}"</span>?
              This action cannot be undone.
            </p>
          </div>

          {error && (
            <div className="w-full rounded-lg bg-red-500/10 border border-red-500/50 px-4 py-2 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 py-2.5 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 text-sm font-semibold transition"
            >
              {loading ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
