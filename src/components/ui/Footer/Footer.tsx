import {
  FiArrowUpRight,

  FiMail,
  FiGlobe,
  FiMapPin,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { ShootingStarsAndStarsBackgroundDemo } from "./ShootingStars";

// ── Dev team – update names & LinkedIn URLs when provided ─────────────────────
const devTeam: { name: string; linkedin: string }[] = [
  { name: "Abhishek Saini", linkedin: "https://www.linkedin.com/in/abhisheksaini04/" },
  { name: "Komal Verma", linkedin: "https://www.linkedin.com/in/komalverma007/" },
  { name: "Sahil Ninania", linkedin: "https://www.linkedin.com/in/sahil-ninania-b0b375337" },
  { name: "Piyush Yadav", linkedin: "https://www.linkedin.com/in/piyush-yadav-0603py/" },
];


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-[#050608] via-[#050608] to-[#020307] text-white">
      {/* ShootingStars and StarsBackground replacing the radial gradient */}
      <ShootingStarsAndStarsBackgroundDemo />

      {/* Optional: Agar thoda original gradient effect bhi rakhna ho */}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12 py-12 sm:py-14 md:py-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-5 py-3 sm:py-4 backdrop-blur">
              TECHNOVA'26
            </div>
            <p
              className="max-w-md text-xs sm:text-sm text-white/70 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              TECHNOVA is DCRUST&apos;s annual technical symposium, attracting thousands of NCR students to showcase innovation, creativity, and diverse technical events.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 text-[0.65rem] sm:text-xs uppercase text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2">
                <FiMapPin className="h-3 w-3 sm:h-4 sm:w-4 text-white/90" />
                DCRUST Murthal
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2">
                13-14 March 2026
              </span>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="space-y-4 sm:space-y-5">
            <h3
              className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/60 font-semibold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Navigation
            </h3>
            <div className="grid gap-3 text-xs sm:text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              <Link
                to="/"
                className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md"
              >
                <span>Home</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </Link>
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md"
              >
                <span>Gallery</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </Link>
              <a
                href="/events"
                className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md"
              >
                <span>Event</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              <Link
                to="/getting-here"
                className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md"
              >
                <span>Getting Here</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </Link>
              <a
                href="/brochure-technova_compressed.pdf"
                download="brochure-technova_compressed.pdf"
                className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md"
              >
                <span>Brochure</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md"
              >
                <span>Contact</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-5">
            <h3
              className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/60 font-semibold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Quick Links
            </h3>
            <div className="grid gap-3 text-xs sm:text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              <a href="/#about" className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md">
                <span>About Us</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              <a href="/events" className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md">
                <span>All Events</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              <Link to="/account" className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white/80 transition hover:text-white hover:bg-white/10 hover:backdrop-blur-md">
                <span>Account</span>
                <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4 sm:space-y-5">
            <h3
              className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/60 font-semibold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Connect
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
              <li className="flex items-start gap-2 sm:gap-3">
                <FiMail className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-white/90 flex-shrink-0" />
                <a href="mailto:coordinator_technova@dcrustm.org" className="hover:text-white transition break-all hover:bg-white/10 hover:backdrop-blur-md px-2 py-1 rounded">
                  coordinator_technova@dcrustm.org
                </a>
              </li>
              {/* <li className="flex items-start gap-2 sm:gap-3">
                <FiInstagram className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-white/90 flex-shrink-0" />
                <a
                  href="https://instagram.com/technova_dcrust"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition hover:bg-white/10 hover:backdrop-blur-md px-2 py-1 rounded"
                >
                  @technova_dcrust
                </a>
              </li> */}
              <li className="flex items-start gap-2 sm:gap-3">
                <FiGlobe className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-white/90 flex-shrink-0" />
                <a
                  href="https://www.dcrustm.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition hover:bg-white/10 hover:backdrop-blur-md px-2 py-1 rounded break-all"
                >
                  www.dcrustm.ac.in
                </a>
              </li>
            </ul>
          </div>

          {/* Dev Team */}
          <div className="space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-1">
            <h3
              className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/60 font-semibold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Dev Team
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              {devTeam.map((member) => (
                <li key={member.name}>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-white/70 transition hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0 group-hover:bg-indigo-400 transition" />
                    {member.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="mt-10 sm:mt-12 md:mt-16 flex flex-col gap-4 sm:gap-5 border-t border-white/10 pt-6 sm:pt-8 text-xs sm:text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
          <div className="text-center text-white/60">
            <span>© {currentYear} Technova&apos;26 · Deenbandhu Chhotu Ram University of Science & Technology</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-white/50">
            <span className="text-[0.65rem] sm:text-xs">Made with <span className="text-red-400">♥</span> by</span>
            {devTeam.map((member, i) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[0.65rem] sm:text-xs text-indigo-300 hover:text-indigo-200 transition underline underline-offset-2"
              >
                {member.name}{i < devTeam.length - 1 ? "," : ""}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;