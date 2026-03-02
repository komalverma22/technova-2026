import { useEffect, useRef, useState } from "react";
import { Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";

// ── Registration deadline ─────────────────────────────────────────────────────
// Update this date to match the real registration closing date/time (ISO 8601).
const REGISTRATION_DEADLINE = new Date("2026-03-11T11:00:00+05:30");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
      expired: diff === 0,
    };
  };
  const [time, setTime] = useState(calc);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    ref.current = setInterval(() => setTime(calc()), 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-xl px-3 py-2 text-center backdrop-blur-md"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.55) 0%, rgba(139,92,246,0.45) 100%)",
          border: "1px solid rgba(165,180,252,0.45)",
          boxShadow: "0 0 12px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <span
          className="text-2xl sm:text-3xl font-extrabold tabular-nums leading-none text-white"
          style={{ textShadow: "0 0 16px rgba(165,180,252,0.9)" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </div>
  );
}

function RegistrationCountdown() {
  const { days, hours, minutes, seconds, expired } = useCountdown(REGISTRATION_DEADLINE);
  return (
    <div className="mt-5 flex flex-col items-center gap-2">
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        Registration ends in
      </p>
      {expired ? (
        <p className="text-sm font-bold text-red-400 tracking-wide">Registration Closed</p>
      ) : (
        <div className="flex items-end gap-2 sm:gap-3">
          <CountdownUnit value={days} label="Days" />
          <span className="mb-5 text-2xl font-black leading-none text-indigo-300 drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]">:</span>
          <CountdownUnit value={hours} label="Hours" />
          <span className="mb-5 text-2xl font-black leading-none text-indigo-300 drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]">:</span>
          <CountdownUnit value={minutes} label="Min" />
          <span className="mb-5 text-2xl font-black leading-none text-indigo-300 drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]">:</span>
          <CountdownUnit value={seconds} label="Sec" />
        </div>
      )}
    </div>
  );
}

function App() {
  const [heroImage, setHeroImage] = useState("/hero1.png");
  const [heroIndex, setHeroIndex] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Cookie check is synchronous — runs before first paint via useEffect
    const hasToken = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("token="));
    setIsAuthenticated(hasToken);
  }, []);

  const handleImageHover = (image: string, index: number) => {
    setHeroImage(image);
    setHeroIndex(index);
  };

  return (
    <div className="relative min-h-screen bg-slate-600 overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pt-2 sm:pt-[10.8px]">
        <div className="max-w-3xl mx-auto bg-slate-300/95 backdrop-blur-sm rounded-lg sm:rounded-xl py-2 sm:py-[9px] overflow-hidden">
          <div className="flex animate-scroll-left">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="inline-block mx-4 sm:mx-[28.8px] text-[10px] sm:text-[12.6px] font-medium text-slate-900 whitespace-nowrap"
              >
                TECHNOVA'26
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* navbar */}
      <nav className="fixed top-[42px] sm:top-[50.4px] left-0 right-0 z-40 px-3 sm:px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-slate-300/95 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 sm:px-[28.8px] py-3 sm:py-[14.4px] flex items-center justify-between">
          <a href="/" className="flex items-center shrink-0">
            <img
              src="/favicon2.png"
              alt="TechNova'26"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>

          <div className="hidden lg:flex items-center gap-4 xl:gap-[25.2px] text-[13.5px] ml-auto">
            <a
              href="/"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Home
            </a>
            <Link
              to="/gallery"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Gallery
            </Link>
            <a
              href="/events"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Events
            </a>
            <Link
              to="/getting-here"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Getting Here
            </Link>
            <Link
              to="/brochure"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Brochure
            </Link>
            <Link
              to="/schedule"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Schedule
            </Link>
            <Link
              to="/contact"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Contact
            </Link>

            {/* <a href="#" className="text-slate-900 hover:text-black transition-colors flex items-center gap-2 font-medium">
              <ShoppingBag className="w-[16.2px] h-[16.2px]" />
              Bag
              <span className="flex items-center justify-center w-[21.6px] h-[21.6px] rounded-full border border-slate-900 text-[12.6px] font-medium">0</span>
            </a> */}
          </div>
          <div style={{ marginLeft: "10px" }} className="flex items-center gap-2">
            {/* Render nothing until auth is resolved → no flash */}
            {isAuthenticated === true && (
              <Link
                to="/account"
                className="text-slate-900 hover:text-black transition-colors"
                title="My Account"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
            {isAuthenticated === false && (
              <div className="hidden lg:flex items-center gap-2">

                <Link
                  to="/signup"
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-[13px] font-semibold text-white transition hover:bg-slate-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {/* TechNova logo — desktop only, after auth */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-400/60 bg-slate-100 shadow-sm">
                <img
                  src="/favicon.png"
                  alt="TechNova"
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-900 hover:text-black transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-3xl mx-auto bg-slate-300/95 backdrop-blur-md rounded-xl px-4 py-4">
            <div className="flex flex-col gap-3 text-sm">
              <a href="/" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Home</a>
              <Link to="/gallery" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Gallery</Link>
              <a href="/events" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Events</a>
              <Link to="/getting-here" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Getting Here</Link>
              <Link to="/brochure" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Brochure</Link>
              <Link to="/schedule" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Schedule</Link>
              <Link to="/contact" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Contact</Link>
              {/* Auth links in mobile menu */}
              {isAuthenticated === true && (
                <Link to="/account" className="flex items-center gap-2 text-slate-900 hover:text-black transition-colors font-medium py-2">
                  <User className="w-4 h-4" />
                  My Account
                </Link>
              )}
              {isAuthenticated === false && (
                <>

                  <Link to="/signup" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="relative h-screen pt-[80px] sm:pt-[90px] md:pt-[100.8px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fashion model in blue denim"
            className="w-full h-full object-cover transition-all duration-500"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </div>

        <div className="relative h-full">

          {/* ── Logo — positioned in the upper-middle of the hero, above the thumbnail strip ── */}
          <div className="absolute inset-0 flex items-start justify-center pt-[15%] sm:pt-[12%] md:pt-[10%] pointer-events-none">
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white select-none"
              style={{
                textShadow:
                  "0 2px 32px rgba(0,0,0,0.95), 0 0 60px rgba(99,102,241,0.55), 0 0 120px rgba(139,92,246,0.35)",
              }}
            >
              Technova&apos;26
            </h1>
          </div>

          {/* ── Bottom strip — thumbnails + countdown + login ── */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 sm:gap-4 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6">
            <div className="relative flex flex-col items-center w-full">
              {/* Thumbnail strip – scrollable on tiny screens */}
              <div className="w-full overflow-x-auto pb-1 flex justify-center">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5 w-max px-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white/30 leading-none transition-all duration-300 shrink-0">
                    {heroIndex.toString().padStart(2, "0")}
                  </span>
                  <div className="flex gap-2 sm:gap-3">
                    <div
                      className="w-20 h-12 sm:w-24 sm:h-14 md:w-[128px] md:h-[72px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all cursor-pointer shrink-0"
                      onClick={() => handleImageHover("/hero1.png", 1)}
                      onMouseEnter={() => handleImageHover("/hero1.png", 1)}
                    >
                      <img
                        src="/hero1.png"
                        alt="Collection preview 1"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div
                      className="w-20 h-12 sm:w-24 sm:h-14 md:w-[128px] md:h-[72px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all cursor-pointer shrink-0"
                      onClick={() => handleImageHover("/hero2.png", 2)}
                      onMouseEnter={() => handleImageHover("/hero2.png", 2)}
                    >
                      <img
                        src="/hero2.png"
                        alt="Collection preview 2"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div
                      className="w-20 h-12 sm:w-24 sm:h-14 md:w-[128px] md:h-[72px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all cursor-pointer shrink-0"
                      onClick={() => handleImageHover("/hero3.png", 3)}
                      onMouseEnter={() => handleImageHover("/hero3.png", 3)}
                    >
                      <img
                        src="/hero3.png"
                        alt="Collection preview 3"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Registration countdown — always visible ───────────────── */}
              <RegistrationCountdown />

              {/* Log In button — only when auth is confirmed false */}
              {isAuthenticated === false && (
                <div className="mt-4">
                  <Link to="/login">
                    <button className="bg-white hover:bg-slate-200 text-slate-900 font-semibold text-[13px] sm:text-[15px] px-5 py-2 rounded-lg transition-all">
                      Log In
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>   {/* end bottom strip */}
        </div>   {/* end relative h-full */}
      </div>   {/* end h-screen */}
    </div>
  );
}

export default App;
