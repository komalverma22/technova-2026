import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────
// Replace image src values with actual photos when available.
const messages = [
    {
        id: 1,
        role: 'VICE-CHANCELLOR',
        fullTitle: "Hon’ble Vice-Chancellor",
        name: 'Prof. (Dr.) Shree Prakash Singh (Hon’ble Vice-Chancellor)',
        image: '/vc.webp',      // replace with actual image
        fallbackInitial: 'VC',
        message:
            "It gives me immense pleasure to convey my heartfelt greetings and best wishes to all participants, organizers, and distinguished guests on the occasion of the Annual Technical Fest of Deenbandhu Chhotu Ram University of Science and Technology, scheduled for March 13–14, 2026.\n\nAs we gather to celebrate this vibrant event, we do so at a time when India is steadily progressing toward the transformative vision of Viksit Bharat 2047. Our universities hold a vital responsibility in nurturing innovation, fostering entrepreneurship, and advancing technological leadership. Achieving a developed India calls for self-reliance, research excellence, digital empowerment, sustainable development, and globally competent talent.\n\nI am reminded of the inspiring national vision articulated by our Hon’ble Prime Minister through Viksit Bharat 2047 and Atmanirbhar Bharat, which urges our youth to become pioneers of innovation, resilience, and sustainable progress.\n\nThis Technical Fest embodies that very spirit. It offers a dynamic platform for budding innovators to explore cutting-edge domains such as Artificial Intelligence, Green Technologies, Cybersecurity, and Advanced Manufacturing—fields that will significantly shape India’s developmental journey in the decades ahead.\n\nMore than a showcase of technical excellence, this fest represents a collective step toward realizing our national aspirations, bringing together students from Haryana, neighboring states, and affiliated institutions to exchange ideas, ignite creativity, and design solutions for the future.\n\nI encourage every participant to innovate with vision, collaborate with integrity, and contribute meaningfully to national advancement. May this fest inspire transformative ideas that strengthen our resolve to build a technologically empowered and developed India by 2047.\n\nI commend the organizing team for their dedication and extend my best wishes for the grand success of the fest.\n\nWith best wishes",
    },
    {
        id: 2,
        role: 'DSW',
        fullTitle: "Dean Student Welfare",
        name: 'Prof. (Dr.) Suresh Verma (Dean Students’ Welfare) ',
        image: '/dsw.webp',     // replace with actual image
        fallbackInitial: 'DSW',
        message:
            "At DCRUST, we believe that student life is enriched not only through academics but also through vibrant cultural and technical engagements. The Annual Technical Fest, to be held on March 13–14, 2026, is designed to ignite innovation, foster teamwork, and celebrate youthful energy. Aligned with the spirit of Startup India and Atmanirbhar Bharat, this fest encourages students to think entrepreneurially, innovate fearlessly, and collaborate meaningfully. We are delighted to welcome participants from our affiliated colleges and neighbouring states, who will join us in this grand celebration of knowledge and creativity. I encourage every student to participate wholeheartedly, learn from peers, and enjoy the spirit of togetherness that this fest embodies. Together, let us take confident steps toward building a self-reliant and developed India.",
    },
    {
        id: 3,
        role: 'REGISTRAR',
        fullTitle: "Registrar",
        name: 'Prof. (Dr.) Ashutosh Mishra (Worthy Registrar)',
        image: '/registrar.jpeg', // replace with actual image
        fallbackInitial: 'REG',
        message:
            "The Annual Technical Fest of DCRUST reflects our commitment to nurturing talent in line with the national missions of Digital India and Skill India. Scheduled for March 13–14, 2026, this fest will bring together bright minds from across Haryana and neighbouring states to showcase their technical skills, creativity, and problem-solving abilities. It is an opportunity for students to engage in healthy competition, build networks, and prepare themselves for the challenges of tomorrow. By participating, you contribute to the larger goal of building a skilled, digitally empowered, and self-reliant India. I extend my best wishes to all participants and assure them of a well-organized, enriching experience.",
    },
];

// ─── Component ─────────────────────────────────────────────────────────────
export function MessagesCarousel() {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [textVisible, setTextVisible] = useState(true);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const total = messages.length;

    const goTo = useCallback(
        (index: number) => {
            setTextVisible(false);
            setTimeout(() => {
                setCurrent((index + total) % total);
                setTextVisible(true);
            }, 300);
        },
        [total]
    );

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

    useEffect(() => {
        if (isHovered) return;
        timerRef.current = setInterval(next, 5000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isHovered, next]);

    const handleDragStart = (clientX: number) => {
        setIsDragging(true);
        setDragStartX(clientX);
        setDragOffset(0);
    };
    const handleDragMove = (clientX: number) => {
        if (!isDragging) return;
        setDragOffset(clientX - dragStartX);
    };
    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragOffset < -50) next();
        else if (dragOffset > 50) prev();
        setDragOffset(0);
    };

    const msg = messages[current];

    return (
        <section
            id="messages"
            className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">

                {/* ── Dynamic Heading ── */}
                <div
                    className="text-center transition-all duration-300"
                    style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? 'translateY(0)' : 'translateY(-8px)' }}
                >
                    <p
                        className="text-indigo-300/80 text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold mb-2"
                    >
                        A Word From Our
                    </p>
                    <h2
                        className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight"
                        style={{ fontFamily: 'Eagle Lake' }}
                    >
                        MESSAGE FROM {msg.role === 'VICE-CHANCELLOR' ? "HON'BLE " : ''}{msg.role}
                    </h2>
                    <p className="mt-2 text-white/50 text-sm sm:text-base font-medium">{msg.fullTitle}</p>
                </div>

                {/* ── Carousel + Text row ── */}
                <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-14 items-center lg:items-start">

                    {/* Image carousel */}
                    <div className="w-full sm:w-[70%] md:w-[55%] lg:w-[40%] shrink-0">
                        <div
                            className="relative select-none overflow-hidden rounded-2xl"
                            style={{ aspectRatio: '3/4', maxHeight: '480px' }}
                            onMouseDown={e => handleDragStart(e.clientX)}
                            onMouseMove={e => handleDragMove(e.clientX)}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                            onTouchStart={e => handleDragStart(e.touches[0].clientX)}
                            onTouchMove={e => handleDragMove(e.touches[0].clientX)}
                            onTouchEnd={handleDragEnd}
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
                                {messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className="relative h-full flex-shrink-0"
                                        style={{ width: `${100 / total}%` }}
                                    >
                                        <img
                                            src={m.image}
                                            alt={`${m.fullTitle} — ${m.name}`}
                                            draggable={false}
                                            className="w-full h-full object-cover rounded-2xl"
                                            onError={(e) => {
                                                // Show a styled fallback if image not found
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                const parent = (e.target as HTMLImageElement).parentElement;
                                                if (parent && !parent.querySelector('.fallback-avatar')) {
                                                    const fb = document.createElement('div');
                                                    fb.className = 'fallback-avatar absolute inset-0 rounded-2xl flex items-center justify-center text-6xl font-black text-white/30 select-none';
                                                    fb.style.background = 'linear-gradient(135deg, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.5) 100%)';
                                                    fb.textContent = m.fallbackInitial;
                                                    parent.appendChild(fb);
                                                }
                                            }}
                                        />
                                        {/* Subtle gradient overlay */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                                        {/* Name badge */}
                                        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                                            <p className="text-white font-semibold text-sm sm:text-base drop-shadow-lg">{m.name}</p>
                                            <p className="text-white/70 text-xs sm:text-sm">{m.fullTitle}</p>
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

                            {/* Slide counter */}
                            <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium tabular-nums">
                                {current + 1} / {total}
                            </div>
                        </div>

                        {/* Dot indicators */}
                        <div className="mt-4 flex items-center justify-center gap-2">
                            {messages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to ${messages[i].role}`}
                                    className="transition-all duration-300 rounded-full"
                                    style={{
                                        width: i === current ? '24px' : '8px',
                                        height: '8px',
                                        background: i === current ? 'white' : 'rgba(255,255,255,0.35)',
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Message text ── */}
                    <div
                        className="w-full lg:flex-1 flex flex-col justify-center"
                        style={{
                            opacity: textVisible ? 1 : 0,
                            transform: textVisible ? 'translateY(0)' : 'translateY(12px)',
                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}
                    >
                        {/* Decorative quote mark */}
                        <div
                            className="text-7xl sm:text-8xl leading-none mb-2 select-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(139,92,246,0.6))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontFamily: 'Georgia, serif',
                            }}
                        >
                            "
                        </div>

                        <p className="text-gray-200 text-base sm:text-lg leading-relaxed text-justify">
                            {msg.message}
                        </p>

                        {/* Signature line */}
                        <div className="mt-6 flex items-center gap-3">
                            <div
                                className="h-px flex-1 max-w-[60px]"
                                style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.8), transparent)' }}
                            />
                            <div>
                                <p className="text-white font-semibold text-sm">{msg.name}</p>
                                <p className="text-indigo-300/70 text-xs tracking-wide">{msg.fullTitle}, DCRUST, Murthal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
