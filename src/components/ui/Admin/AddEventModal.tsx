import { useRef, useState } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import { API_URL, getAuthToken } from "../../../lib/api";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Other",
];

export default function AddEventModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    minTeamSize: "1",
    maxTeamSize: "4",
    date: "",
    venue: "",
    rules: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("department", form.department);
      formData.append("minTeamSize", form.minTeamSize);
      formData.append("maxTeamSize", form.maxTeamSize);
      formData.append("date", new Date(form.date).toISOString());
      formData.append("venue", form.venue);
      formData.append("rules", form.rules);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const token = getAuthToken();
      const res = await fetch(`${API_URL}/api/events/add`, {
        method: "POST",
        headers: token ? { Authorization: token } : {},
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to add event");
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-700/60">
          <h2 className="text-xl font-bold text-white">Add New Event</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors rounded-lg p-1 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/50 px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Event Image
            </label>
            <div
              className="relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-slate-600 hover:border-indigo-500 bg-slate-800/50 cursor-pointer transition-colors group"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-indigo-400 transition-colors">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-sm">Click to upload image</span>
                  <span className="text-xs text-slate-600">PNG, JPG, WEBP up to 10MB</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            {imageFile && (
              <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                <Upload className="w-3 h-3" /> {imageFile.name}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Hackathon 2026"
              className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description of the event…"
              className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Department <span className="text-red-400">*</span>
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            >
              <option value="" disabled>Select department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Team Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Min Team Size <span className="text-red-400">*</span>
              </label>
              <input
                name="minTeamSize"
                type="number"
                min="1"
                value={form.minTeamSize}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Max Team Size <span className="text-red-400">*</span>
              </label>
              <input
                name="maxTeamSize"
                type="number"
                min="1"
                value={form.maxTeamSize}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Date & Time <span className="text-red-400">*</span>
            </label>
            <input
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition [color-scheme:dark]"
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Venue <span className="text-red-400">*</span>
            </label>
            <input
              name="venue"
              value={form.venue}
              onChange={handleChange}
              required
              placeholder="e.g. Main Auditorium, Block A"
              className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Rules */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Rules <span className="text-red-400">*</span>
            </label>
            <textarea
              name="rules"
              value={form.rules}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Event rules and guidelines…"
              className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 py-2.5 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 text-sm font-semibold transition"
            >
              {loading ? "Adding…" : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
