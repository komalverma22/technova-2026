import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const posters = [
    { id: 1, src: '/poster.png', alt: "TechNova'26 Poster 1" },
    { id: 2, src: '/poster.png', alt: "TechNova'26 Poster 2" },
    { id: 3, src: '/poster.png', alt: "TechNova'26 Poster 3" },
];

export default function PosterCarousel() {
    // ── Carousel state ──────────────────────────────────────────────────────────
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const total = posters.length;

    const goTo = useCallback((index: number) => {
        setCurrent((index + total) % total);
    }, [total]);

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

    useEffect(() => {
        if (isHovered) return;
        timerRef.current = setInterval(next, 3000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isHovered, next]);

    const handleDragStart = (clientX: number) => { setIsDragging(true); setDragStartX(clientX); setDragOffset(0); };
    const handleDragMove = (clientX: number) => { if (!isDragging) return; setDragOffset(clientX - dragStartX); };
    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragOffset < -50) next();
        else if (dragOffset > 50) prev();
        setDragOffset(0);
    };

    // ── Lightbox state ──────────────────────────────────────────────────────────
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => { if (!isDragging) setLightboxIndex(index); };
    const closeLightbox = () => setLightboxIndex(null);
    const lightboxNext = () => setLightboxIndex(i => i !== null ? (i + 1) % total : null);
    const lightboxPrev = () => setLightboxIndex(i => i !== null ? (i - 1 + total) % total : null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') lightboxNext();
            if (e.key === 'ArrowLeft') lightboxPrev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    return (
        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 flex justify-center">
            <div className="w-full max-w-[700px]">
                {/* ── Carousel ── */}
                <div
                    className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] select-none overflow-hidden rounded-2xl cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => { setIsHovered(false); handleDragEnd(); }}
                    onMouseDown={e => handleDragStart(e.clientX)}
                    onMouseMove={e => handleDragMove(e.clientX)}
                    onMouseUp={handleDragEnd}
                    onTouchStart={e => handleDragStart(e.touches[0].clientX)}
                    onTouchMove={e => handleDragMove(e.touches[0].clientX)}
                    onTouchEnd={handleDragEnd}
                    onClick={() => openLightbox(current)}
                >
                    {/* Image track */}
                    <div
                        className="flex h-full"
                        style={{
                            width: `${total * 100}%`,
                            transform: `translateX(calc(-${(current * 100) / total}% + ${dragOffset / total}px))`,
                            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                    >
                        {posters.map((poster) => (
                            <div key={poster.id} className="relative h-full flex-shrink-0" style={{ width: `${100 / total}%` }}>
                                <img
                                    src={poster.src}
                                    alt={poster.alt}
                                    draggable={false}
                                    className="w-full h-full object-contain rounded-2xl"
                                />
                                {/* Click-to-view overlay */}
                                <div className="absolute inset-0 rounded-2xl bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                                    <span className="text-white text-sm font-medium opacity-0 bg-black/50 px-3 py-1.5 rounded-full">
                                        Click to view
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Prev arrow */}
                    <button
                        onClick={e => { e.stopPropagation(); prev(); }}
                        aria-label="Previous"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all hover:scale-110"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Next arrow */}
                    <button
                        onClick={e => { e.stopPropagation(); next(); }}
                        aria-label="Next"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all hover:scale-110"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2">
                        {posters.map((_, i) => (
                            <button
                                key={i}
                                onClick={e => { e.stopPropagation(); goTo(i); }}
                                aria-label={`Go to slide ${i + 1}`}
                                className="transition-all duration-300 rounded-full"
                                style={{ width: i === current ? '20px' : '8px', height: '8px', background: i === current ? 'white' : 'rgba(255,255,255,0.45)' }}
                            />
                        ))}
                    </div>

                    {/* Slide counter */}
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium tabular-nums">
                        {current + 1} / {total}
                    </div>
                </div>
            </div>

            {/* ── Lightbox ── */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <img
                            src={posters[lightboxIndex].src}
                            alt={posters[lightboxIndex].alt}
                            className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
                        />

                        {/* Close */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/75 rounded-full p-2 transition"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={e => { e.stopPropagation(); lightboxPrev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75 rounded-full p-2 transition"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Next */}
                        <button
                            onClick={e => { e.stopPropagation(); lightboxNext(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75 rounded-full p-2 transition"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                            {lightboxIndex + 1} / {total}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
