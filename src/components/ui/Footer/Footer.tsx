import React from "react";
import {
  FiArrowUpRight,
  FiInstagram,
  FiMail,
  FiGlobe,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-[#050608] via-[#050608] to-[#020307] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(199,255,94,0.08), transparent 55%), radial-gradient(circle at 80% 15%, rgba(199,255,94,0.12), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.05), transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12 py-12 sm:py-14 md:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-[1.25fr_1fr_1fr]">
          <div className="space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-5 py-3 sm:py-4 backdrop-blur">
              <img
                src="/logowhitenobg.png"
                alt="Rhythm'25 Logo"
                width="160"
                height="60"
                className="h-auto w-32 sm:w-40"
              />
            </div>
            <p
              className="max-w-md text-xs sm:text-sm text-white/70"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Rhythm&apos;25 is the annual cultural summit of DCRUST Murthal — a two-day
              convergence of music, art, and electric campus energy. Join us on
              15-16 November for a hypercharged experience crafted by the
              community, for the community.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-[0.65rem] sm:text-xs uppercase text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2">
                <FiMapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#C7FF5E]" />
                 DCRUST Murthal
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2">
                14 – 15 Nov 2025
              </span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h3
              className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/60"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Quick Navigate
            </h3>
            <div className="grid gap-2.5 sm:gap-3 text-xs sm:text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              <a href="/#about" className="group inline-flex items-center gap-2 text-white/80 transition hover:text-white">
                <span>About Rhythm</span>
                <FiArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              <a href="/events" className="group inline-flex items-center gap-2 text-white/80 transition hover:text-white">
                <span>Events Lineup</span>
                <FiArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              <a href="/registration" className="group inline-flex items-center gap-2 text-white/80 transition hover:text-white">
                <span>Registration</span>
                <FiArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              <a href="/gallery" className="group inline-flex items-center gap-2 text-white/80 transition hover:text-white">
                <span>Gallery</span>
                <FiArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              <a href="/getting-here" className="group inline-flex items-center gap-2 text-white/80 transition hover:text-white">
                <span>Getting Here</span>
                <FiArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h3
              className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/60"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Connect with Us
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
              <li className="flex items-start gap-2 sm:gap-3">
                <FiMail className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#C7FF5E] flex-shrink-0" />
                <a href="mailto:rhythm2025@dcrustm.org" className="hover:text-white transition break-all">
                  rhythm2025@dcrustm.org
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <FiInstagram className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#C7FF5E] flex-shrink-0" />
                <a
                  href="https://instagram.com/rhythm_dcrust"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  @rhythm_dcrust
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <FiGlobe className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#C7FF5E] flex-shrink-0" />
                <a
                  href="https://www.dcrustm.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition break-all"
                >
                  www.dcrustm.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col gap-3 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6 text-xs sm:text-sm text-white/50 md:flex-row md:items-center md:justify-between" style={{ fontFamily: "Inter, sans-serif" }}>
          <span className="text-center md:text-left">© {currentYear} Rhythm&apos;25 · Deenbandhu Chhotu Ram University of Science & Technology</span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 text-white/60">
            <a
              href="https://instagram.com/rhythm_dcrust"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[0.65rem] sm:text-xs uppercase transition hover:border-[#C7FF5E]/40 hover:bg-[#C7FF5E]/15 hover:text-white"
            >
              <FiInstagram className="h-3 w-3 sm:h-4 sm:w-4" /> Follow Rhythm
            </a>
            <a
              href="mailto:rhythm2025@dcrustm.org"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[0.65rem] sm:text-xs uppercase transition hover:border-[#C7FF5E]/40 hover:bg-[#C7FF5E]/15 hover:text-white"
            >
              <FiMail className="h-3 w-3 sm:h-4 sm:w-4" /> Write to Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;