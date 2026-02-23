import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * A consistent back-navigation button used across all sub-pages.
 * First tries browser history; falls back to `fallbackPath` (default: "/").
 */
export function BackButton({ fallbackPath = "/" }: { fallbackPath?: string }) {
    const navigate = useNavigate();

    const handleBack = () => {
        // If there's history to go back to, use it; otherwise fall back
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallbackPath);
        }
    };

    return (
        <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition hover:border-slate-500 hover:bg-slate-700/60 hover:text-white active:scale-95"
        >
            <ArrowLeft className="size-4" />
            Back
        </button>
    );
}
