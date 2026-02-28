import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { BackButton } from "../BackButton";

// Point PDF.js worker at the CDN build that ships with react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const PDF_PATH = "/technova-eventSchedule.pdf";

export default function SchedulePage() {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.2);
    const [loadError, setLoadError] = useState(false);

    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setLoadError(false);
    }, []);

    const onDocumentLoadError = useCallback(() => {
        setLoadError(true);
    }, []);

    const goToPrev = () => setPageNumber((p) => Math.max(p - 1, 1));
    const goToNext = () => setPageNumber((p) => Math.min(p + 1, numPages));
    const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
    const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.6));

    return (
        <div className="relative min-h-svh px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-5xl">

                {/* ── Header ─────────────────────────────────────────────────── */}
                <div className="mb-2">
                    <BackButton fallbackPath="/" />
                </div>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1
                            className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
                            style={{ fontFamily: "Eagle Lake" }}
                        >
                            Schedule
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            TechNova&apos;26 — Event Schedule
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                        <a
                            href={PDF_PATH}
                            download="technova-eventSchedule.pdf"
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95"
                        >
                            <Download className="size-4" />
                            Download PDF
                        </a>
                        <a
                            href={PDF_PATH}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-700 hover:text-white active:scale-95"
                        >
                            <ExternalLink className="size-4" />
                            Open in Tab
                        </a>
                    </div>
                </div>

                {/* ── Controls bar ────────────────────────────────────────────── */}
                {!loadError && numPages > 0 && (
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-2.5">
                        {/* Pagination */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToPrev}
                                disabled={pageNumber <= 1}
                                className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 transition hover:bg-slate-700 disabled:opacity-30"
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="size-4" />
                            </button>
                            <span className="min-w-[90px] text-center text-sm text-slate-300">
                                Page <strong className="text-white">{pageNumber}</strong> of{" "}
                                <strong className="text-white">{numPages}</strong>
                            </span>
                            <button
                                onClick={goToNext}
                                disabled={pageNumber >= numPages}
                                className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 transition hover:bg-slate-700 disabled:opacity-30"
                                aria-label="Next page"
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </div>

                        {/* Zoom */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={zoomOut}
                                disabled={scale <= 0.6}
                                className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 transition hover:bg-slate-700 disabled:opacity-30"
                                aria-label="Zoom out"
                            >
                                <ZoomOut className="size-4" />
                            </button>
                            <span className="min-w-[44px] text-center text-xs text-slate-400">
                                {Math.round(scale * 100)}%
                            </span>
                            <button
                                onClick={zoomIn}
                                disabled={scale >= 3}
                                className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 transition hover:bg-slate-700 disabled:opacity-30"
                                aria-label="Zoom in"
                            >
                                <ZoomIn className="size-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* ── PDF Viewer ──────────────────────────────────────────────── */}
                <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-950 shadow-2xl">
                    {loadError ? (
                        /* Fallback when PDF can't load */
                        <div className="flex flex-col items-center gap-5 px-6 py-16 text-center">
                            <span className="text-5xl">📋</span>
                            <div>
                                <p className="text-base font-semibold text-white">
                                    Could not load the schedule
                                </p>
                                <p className="mt-1 text-sm text-slate-400">
                                    Try downloading it or opening it in a new tab.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 w-full max-w-xs">
                                <a
                                    href={PDF_PATH}
                                    download="technova-eventSchedule.pdf"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                                >
                                    <Download className="size-4" />
                                    Download PDF
                                </a>
                                <a
                                    href={PDF_PATH}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                                >
                                    <ExternalLink className="size-4" />
                                    Open in Browser
                                </a>
                            </div>
                        </div>
                    ) : (
                        /* Scrollable PDF canvas */
                        <div
                            className="overflow-auto"
                            style={{ maxHeight: "85vh" }}
                        >
                            <div className="flex justify-center py-6">
                                <Document
                                    file={PDF_PATH}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={onDocumentLoadError}
                                    loading={
                                        <div className="flex flex-col items-center gap-3 py-24 text-slate-400">
                                            <svg className="animate-spin size-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            <p className="text-sm">Loading schedule…</p>
                                        </div>
                                    }
                                >
                                    <Page
                                        pageNumber={pageNumber}
                                        scale={scale}
                                        renderTextLayer={true}
                                        renderAnnotationLayer={true}
                                        className="shadow-2xl"
                                    />
                                </Document>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Bottom quick-nav ────────────────────────────────────────── */}
                {!loadError && numPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                            onClick={goToPrev}
                            disabled={pageNumber <= 1}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 disabled:opacity-30"
                        >
                            ← Prev
                        </button>
                        <span className="text-xs text-slate-500">
                            {pageNumber} / {numPages}
                        </span>
                        <button
                            onClick={goToNext}
                            disabled={pageNumber >= numPages}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 disabled:opacity-30"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
