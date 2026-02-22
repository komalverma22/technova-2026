import { useState, useEffect, useRef, useCallback } from 'react';

const images = [
  { id: 1, imageUrl: '/technova-img1.JPG' },
  { id: 2, imageUrl: '/technova-img2.JPG' },
  { id: 3, imageUrl: '/technova-img3.JPG' },
  { id: 4, imageUrl: '/technova-img4.JPG' },
  { id: 5, imageUrl: '/technova-img5.JPG' },
];

export default function Carousel({
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
}) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const timerRef = useRef(null);
  const total = images.length;

  const goTo = useCallback(
    (index) => {
      if (loop) {
        setCurrent((index + total) % total);
      } else {
        setCurrent(Math.max(0, Math.min(index, total - 1)));
      }
    },
    [loop, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    if (pauseOnHover && isHovered) return;

    timerRef.current = setInterval(next, autoplayDelay);
    return () => clearInterval(timerRef.current);
  }, [autoplay, autoplayDelay, pauseOnHover, isHovered, next]);

  // Touch / mouse drag
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX) => {
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

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); handleDragEnd(); }}
      // Mouse drag
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      // Touch swipe
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      {/* Image Track */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          width: `${total * 100}%`,
          transform: `translateX(calc(-${(current * 100) / total}% + ${dragOffset / total}px))`,
          transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / total}%` }}
          >
            <img
              src={img.imageUrl}
              alt={`Slide ${img.id}`}
              draggable={false}
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* Subtle gradient overlay at bottom */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Prev Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all duration-200 hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all duration-200 hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '20px' : '8px',
              height: '8px',
              background: i === current ? 'white' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium tabular-nums">
        {current + 1} / {total}
      </div>
    </div>
  );
}