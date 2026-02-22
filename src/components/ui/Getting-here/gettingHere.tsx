import { useState, useEffect } from "react";
import { Car, Train, Bus, Plane, MapPin, Navigation, Route, ArrowUpRight } from "lucide-react";
import { Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const ACCENT = "#3B82F6";
const ACCENT_RGB = "59,130,246";

const stats = [
  { value: "50 KM", label: "Delhi -> Murthal" },
  { value: "15 MIN", label: "Sonipat -> Campus" },
  { value: "24/7", label: "Travel Desk Support" },
  { value: "IGI T3", label: "Nearest Airport" },
];
const travelModes = [
  {
    title: "Drive In",
    badge: "NH44 / 50 KM",
    icon: Car,
    summary:
      "Stay on the Delhi–Ambala NH44, slide into the Murthal exit after Sonipat and roll into Gate 1 parking in under five minutes.",
    steps: [
      "Merge onto NH44 and keep left once you pass the Sonipat toll plaza.",
      "Take the Murthal exit and follow campus signage for DCRUST.",
      "Go through Gate 1 for further verification and parking lot.",
    ],
  },
  {
    title: "Train Hop",
    badge: "Sonipat Jn / 8 KM",
    icon: Train,
    summary:
      "Delhi to Sonipat locals run hourly; step out to the ride-share bay, book a cab or take an auto-rickshaw and cruise straight to campus in 15 minutes.",
    steps: [
      "Board any Delhi ⇄ Sonipat local/express (1 Hr average).",
      "Exit the station and book a cab or auto.",
      "Ask for DCRUST Gate 0 drop; arena is a 5-minute walk inside through Gate-1.",
    ],
  },
  {
    title: "Bus Loop",
    badge: "ISBT -> Sonipat",
    icon: Bus,
    summary:
      "Hop on Kashmiri Gate coaches bound for Sonipat. From the bus stand, pool a cab or grab an Auto-Rickhshaw straight to campus Gate 1.",
    steps: [
      "Daily departures every 20-30 minutes from ISBT Kashmiri Gate.",
      "Hop out at Murhtal Chowk and grab an auto-rickshaw for Campus Gate-0.",
      "E-Rickshaw & other CNG Rickshaws run to campus every 10 minutes.",
    ],
  },
  {
    title: "Touchdown IGI",
    badge: "IGI T3 / 60 KM",
    icon: Plane,
    summary:
      "Land at Indira Gandhi International Airport, sync your ride app to DCRUST Murthal and cruise north on NH44 for a seamless arrival.",
    steps: [
      "Head to the arrivals forecourt and book a cab (approx. 70 min).",
      "Join NH44 toward Sonipat; stay in the express lane until Murthal.",
      "Look for the DCRUST Campus main Gate and enter via Gate 0 & 1.",
    ],
  },
];

const quickSteps = [
  {
    label: "Drop Pin",
    detail: "DCRUST Murthal, NH44 Road, Sonipat, Haryana 131039",
    icon: MapPin,
  },
  {
    label: "Navigate",
    detail: "Search for the main stage & Deendayal Upadhyay Convention Center or Auditorium inside campus.",
    icon: Navigation,
  },
  {
    label: "Final Stretch",
    detail: "Follow the line beacons & flags from Gate 1, they pulse right up to the auditorium entrance.",
    icon: Route,
  },
];

const arrivalChecklist = [
  "Display your institute ID and Rhythm access band at Gate 1.",
  "Check in with the hospitality desk for green-room and schedule briefs.",
  "Report to the stage marshal 30 minutes before your performance block.",
];

const mapSrc =
  "https://maps.google.com/maps?q=DCRUST%20Murthal%20University&t=&z=14&ie=UTF8&iwloc=&output=embed";

export default function GettingHerePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("token="));
    setIsAuthenticated(hasToken);
  }, []);

  return (
    <>
        <nav className="fixed top-[42px] sm:top-[50.4px] left-0 right-0 z-40 px-3 sm:px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-slate-300/95 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 sm:px-[28.8px] py-3 sm:py-[14.4px] flex items-center justify-between">
          <div className="text-lg sm:text-[21.6px] font-bold text-slate-900 tracking-tight">
            TÉCHNOVA
          </div>

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
              href="/#events"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Event
            </a>
            <Link
              to="/getting-here"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Getting Here
            </Link>
            <a
              href="/brochure-technova_compressed.pdf"
              download="brochure-technova_compressed.pdf"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Brochure
            </a>
          
            {/* <a href="#" className="text-slate-900 hover:text-black transition-colors flex items-center gap-2 font-medium">
              <ShoppingBag className="w-[16.2px] h-[16.2px]" />
              Bag
              <span className="flex items-center justify-center w-[21.6px] h-[21.6px] rounded-full border border-slate-900 text-[12.6px] font-medium">0</span>
            </a> */}
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <Link
                to="/account"
                className="text-slate-900 hover:text-black transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
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
              <a
                href="/"
                className="text-slate-900 hover:text-black transition-colors font-medium py-2"
              >
                Home
              </a>
              <Link
                to="/gallery"
                className="text-slate-900 hover:text-black transition-colors font-medium py-2"
              >
                Gallery
              </Link>
              <a
                href="/#events"
                className="text-slate-900 hover:text-black transition-colors font-medium py-2"
              >
                Event
              </a>
              <Link
                to="/getting-here"
                className="text-slate-900 hover:text-black transition-colors font-medium py-2"
              >
                Getting Here
              </Link>
              <a
                href="/brochure-technova_compressed.pdf"
                download="brochure-technova_compressed.pdf"
                className="text-slate-900 hover:text-black transition-colors font-medium py-2"
              >
                Brochure
              </a>
            </div>
          </div>
        )}
      </nav>
      <main className="relative min-h-screen w-full overflow-hidden bg-[#0b0b0b] text-white">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-[140px]"
            style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.28), transparent 65%)` }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
            style={{ background: "radial-gradient(circle, rgba(125, 211, 252, 0.16), transparent 70%)" }}
          />
          <div
            className="absolute bottom-[-140px] right-[-80px] h-96 w-96 rounded-full blur-[160px]"
            style={{ background: "radial-gradient(circle, rgba(192, 132, 252, 0.18), transparent 60%)" }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10 lg:pt-44">
          <header className="space-y-6 text-center">
       
            {/* <span
              className="text-xs uppercase text-white/50"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              How to get here
            </span> */}
            {/* <h1
              className="text-[clamp(2.8rem,6vw,4.5rem)] font-normal uppercase tracking-tight"
              style={{ fontFamily: "var(--font-granesta)", color: ACCENT }}
            >
              Navigation Guide
            </h1> */}
            {/* <p
              className="mx-auto max-w-2xl text-base text-white/70"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              A streamlined travel console for Rhythm'25. Lock in your route, drop a pin on campus, and glide into the arena with neon precision.
            </p> */}
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              {/* ✅ Replaced next/link <Link> with standard <a> */}
              <a
                href="/"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase text-white transition hover:border-white/25 hover:bg-white/10"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Back to home
                <ArrowUpRight className="h-4 w-4" style={{ color: ACCENT }} />
              </a>
              <a
                href="https://maps.google.com/maps?q=DCRUST%20Murthal%20University&t=&z=14&ie=UTF8&iwloc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[rgba(59,130,246,0.4)] bg-[rgba(59,130,246,0.12)] px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-[rgba(59,130,246,0.2)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Launch maps
                <ArrowUpRight className="h-4 w-4" style={{ color: ACCENT }} />
              </a>
            </div>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[#111113]/80 px-6 py-6 text-center shadow-[0_14px_35px_rgba(0,0,0,0.35)]"
              >
                <span
                  className="text-[1.8rem] font-semibold uppercase"
                  style={{ fontFamily: "var(--font-inter)", color: ACCENT }}
                >
                  {stat.value}
                </span>
                <span
                  className="mt-3 block text-[0.7rem] uppercase text-white/55"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <section className="mt-16 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111113]/90 shadow-[0_28px_60px_rgba(0,0,0,0.45)]">
              <div
                className="absolute inset-x-4 top-4 h-12 rounded-full"
                style={{ background: `linear-gradient(90deg, rgba(${ACCENT_RGB},0.2), transparent)` }}
              />
              <iframe
                src={mapSrc}
                loading="lazy"
                allowFullScreen
                className="relative h-[380px] w-full rounded-3xl border-0"
                title="DCRUST Murthal Map"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
            </div>
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <h2
                  className="text-left text-2xl text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Campus Coordinates
                </h2>
                <p
                  className="text-sm text-white/70"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Drop the pin, follow the amber beacons, and you'll coast into the Rhythm'25 arena without missing a beat.
                </p>
              </div>
              <div className="space-y-4">
                {quickSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.label}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#121214]/70 px-5 py-4 transition hover:border-[rgba(59,130,246,0.5)] hover:bg-[rgba(59,130,246,0.08)]"
                    >
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ background: `rgba(${ACCENT_RGB},0.15)` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: ACCENT }} />
                      </span>
                      <div className="flex-1">
                        <p
                          className="text-xs uppercase text-white/50"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {step.label}
                        </p>
                        <p
                          className="text-sm text-white/80"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-20">
            <div className="flex flex-col gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
              <h2
                className="text-[clamp(1.8rem,3vw,2.6rem)] uppercase text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Route Navigation Guide
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {travelModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <article
                    key={mode.title}
                    className="rounded-3xl border border-white/10 bg-[#111113]/90 p-8 transition hover:border-[rgba(59,130,246,0.4)] hover:bg-[#14151c]"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ background: `rgba(${ACCENT_RGB},0.12)` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: ACCENT }} />
                      </span>
                      <div>
                        <h3
                          className="text-lg uppercase text-white"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {mode.title}
                        </h3>
                        <span
                          className="text-xs uppercase text-white/50"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {mode.badge}
                        </span>
                      </div>
                    </div>
                    <p
                      className="mt-5 text-sm text-white/70"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {mode.summary}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {mode.steps.map((step) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 text-sm text-white/75"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <span
                            className="mt-2 h-1.5 w-6 rounded-full"
                            style={{ background: ACCENT }}
                          />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mt-20 rounded-3xl border border-white/10 bg-[#111113]/90 p-8 shadow-[0_32px_70px_rgba(0,0,0,0.45)] lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <h2
                  className="text-xl uppercase text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  On-arrival Rhythm
                </h2>
                <p
                  className="text-sm text-white/70"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Three quick beats between stepping onto campus and stepping into the arena.
                </p>
                <ul className="space-y-4">
                  {arrivalChecklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/75"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <span
                        className="mt-1 h-2 w-2 rounded-full"
                        style={{ background: ACCENT }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#0b0b0b]/70 p-6">
                <h3
                  className="text-base uppercase text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Need assistance?
                </h3>
                <p
                  className="mt-3 text-sm text-white/65"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  The travel desk operates round the clock during Rhythm'25. Ping us before you start or when you're on the move.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:rhythm2025@dcrustm.org"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs uppercase text-white transition hover:border-white/30 hover:bg-white/10"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Email Desk
                  </a>
                  {/* ✅ Replaced next/link <Link> with standard <a> */}
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.12)] px-5 py-2 text-xs uppercase text-white transition hover:bg-[rgba(59,130,246,0.2)]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Contact Form
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
   <Footer/>
    </>
  );
}