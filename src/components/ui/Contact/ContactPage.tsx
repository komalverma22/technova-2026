import { Mail, Phone, Linkedin, Code2, Terminal } from "lucide-react";
import Footer from "../Footer/Footer";
import { BackButton } from "../BackButton";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

interface Teacher {
    name: string;
    designation: string;
    eventRole: string;
    photo: string;
}

interface DevMember {
    name: string;
    designation: string;
    eventRole: string;
    photo: string;
    linkedin: string;
    isLead?: boolean;
}

interface Student {
    name: string;
    mobile: string;
    email: string;
    role: "Coordinator" | "Co-Coordinator";
    photo: string;
}

const teacherCoordinators: Teacher[] = [
    {
        name: "Dr. Rajeshwar Das",
        designation: "Associate Professor, Department of Electronics and Communication Engineering",
        eventRole: "Faculty Coordinator, Technova'26",
        photo: "/coordinator-placeholder.png",
    },
    {
        name: "Dr. Mamta",
        designation: "Associate Professor, Department of Chemical Engineering",
        eventRole: "Faculty Co-Coordinator, Technova'26",
        photo: "/coordinator-placeholder.png",
    },
];

const webDCoordinators: DevMember[] = [
    {
        name: "Komal Verma",
        designation: "Department of Computer Science and Engineering",
        eventRole: "Web-Dev Coordinator",
        photo: "https://res.cloudinary.com/dqf7raj6f/image/upload/v1761847482/WhatsApp_Image_2025-10-30_at_23.33.08_46f1d5c0_ncldcf.jpg",
        linkedin: "https://www.linkedin.com/in/komalverma22/",
        isLead: true,
    },
    {
        name: "Abhishek Saini",
        designation: "Department of Computer Science and Engineering",
        eventRole: "Web-Dev Co-Coordinator",
        photo: "https://res.cloudinary.com/dqf7raj6f/image/upload/v1761848191/Screenshot_2025-10-30_234608_poxlie.png",
        linkedin: "https://www.linkedin.com/in/abhisheksaini04/",
        isLead: true,
    },
    {
        name: "Piyush Yadav",
        designation: "Department of Computer Science and Engineering",
        eventRole: "Web-Dev Member",
        photo: "https://res.cloudinary.com/dqf7raj6f/image/upload/v1772011421/WhatsApp_Image_2026-02-24_at_12.05.42_baa0sk.jpg",
        linkedin: "https://www.linkedin.com/in/piyush-yadav-0603py/",
    },
    {
        name: "Sahil Ninania",
        designation: "Department of Computer Science and Engineering",
        eventRole: "Web-Dev Member",
        photo: "https://res.cloudinary.com/dqf7raj6f/image/upload/v1772013459/WhatsApp_Image_2026-02-25_at_15.17.12_bj6bld.jpg",
        linkedin: "https://www.linkedin.com/in/sahil-ninania-b0b375337",
    },
];

const studentCoordinators: Student[] = [
    {
        name: "Rishi",
        mobile: "+91 98170 88907",
        email: "23001003100rishi@dcrustm.org",
        role: "Coordinator",
        photo: "https://res.cloudinary.com/dqf7raj6f/image/upload/v1772012910/WhatsApp_Image_2026-02-25_at_14.58.18_npcm3p.jpg",
    },
    {
        name: "Aditya Aggarwal",
        mobile: "+91 98734 03658",
        email: "23001001008aditya@dcrustm.org",
        role: "Co-Coordinator",
        photo: "https://res.cloudinary.com/dqf7raj6f/image/upload/v1772012754/IMG_1530_iixner.jpg",
    },
    {
        name: "Shiv",
        mobile: "+91 7088163828",
        email: "23001004041shiv@dcrustm.org",
        role: "Co-Coordinator",
        photo: "https://res.cloudinary.com/dqf7raj6f/image/upload/v1772013314/IMG_0599_celqp0.jpg",
    },
    {
        name: "Nandini",
        mobile: "+91 85274 68520",
        email: "24001008008nandani@dcrustm.org",
        role: "Co-Coordinator",
        photo: "https://res.cloudinary.com/dqf7raj6f/image/upload/v1772012525/WhatsApp_Image_2026-02-24_at_13.34.09_uoecqh.jpg",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function TeacherCard({ t }: { t: Teacher }) {
    return (
        <div className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:-translate-y-1">
            {/* Glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-indigo-500/30 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative mb-3 sm:mb-4 h-20 w-20 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-indigo-500/40 shadow-lg shadow-indigo-900/30">
                <img
                    src={t.photo}
                    alt={t.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=1e2748&color=a5b4fc&size=128&bold=true`;
                    }}
                />
            </div>

            {/* Badge */}
            <span className="mb-3 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                Faculty
            </span>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{t.name}</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">{t.designation}</p>
            <p className="mt-2 text-xs font-medium text-indigo-300/80 leading-relaxed">{t.eventRole}</p>
        </div>
    );
}

// ── Dev Team Card ─────────────────────────────────────────────────────────────
function DevCard({ m }: { m: DevMember }) {
    const isLead = !!m.isLead;
    const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div className="group relative flex flex-col items-center rounded-2xl border border-emerald-500/15 bg-[#060d14] p-5 sm:p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/40 hover:shadow-[0_0_50px_rgba(52,211,153,0.12)] hover:-translate-y-1.5 overflow-hidden">

            {/* Animated scan-line */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
                    style={{ animation: "scanline 2s linear infinite" }}
                />
            </div>

            {/* Corner brackets — top-left */}
            <span className="pointer-events-none absolute top-2.5 left-2.5 text-emerald-500/30 text-lg leading-none select-none group-hover:text-emerald-400/60 transition-colors duration-300">
                {"<"}
            </span>
            {/* Corner brackets — bottom-right */}
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 text-emerald-500/30 text-lg leading-none select-none group-hover:text-emerald-400/60 transition-colors duration-300">
                {"/>"}
            </span>

            {/* Glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-emerald-400/25 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative mb-4 h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-xl border border-emerald-500/30 shadow-lg shadow-emerald-900/20 group-hover:border-emerald-400/60 transition-colors duration-300">
                <img
                    src={m.photo}
                    alt={m.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=0a1a0f&color=34d399&size=128&bold=true&format=svg`;
                    }}
                />
                {/* Terminal blink dot */}
                <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                    style={{ animation: "pulse 2s ease-in-out infinite" }}
                />
            </div>

            {/* Badge */}
            <span className={`mb-3 inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest ${isLead
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                : "border-emerald-600/30 bg-emerald-900/20 text-emerald-500"
                }`}>
                {isLead ? <Terminal className="h-2.5 w-2.5" /> : <Code2 className="h-2.5 w-2.5" />}
                {isLead ? "Lead Dev" : "Dev Team"}
            </span>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{m.name}</h3>
            <p className="mt-1 text-[11px] text-slate-500 font-mono leading-relaxed">{m.eventRole}</p>
            <p className="mt-1 text-[10px] text-slate-600 leading-relaxed">{m.designation}</p>

            {/* LinkedIn CTA — slides up on hover */}
            <div className="mt-4 w-full overflow-hidden">
                <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#0A66C2]/30 bg-[#0A66C2]/10 py-2 text-xs font-semibold text-[#7ab8f5] transition-all duration-300 hover:border-[#0A66C2]/70 hover:bg-[#0A66C2]/20 hover:text-white active:scale-95"
                >
                    <Linkedin className="h-3.5 w-3.5 shrink-0" />
                    Connect on LinkedIn
                </a>
            </div>
        </div>
    );
}

function StudentCard({ s }: { s: Student }) {
    const isCoord = s.role === "Coordinator";
    return (
        <div className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(6,182,212,0.12)] hover:-translate-y-1">
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-cyan-500/30 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative mb-3 sm:mb-4 h-20 w-20 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-cyan-500/40 shadow-lg shadow-cyan-900/20">
                <img
                    src={s.photo}
                    alt={s.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=0d2030&color=67e8f9&size=128&bold=true`;
                    }}
                />
            </div>

            {/* Role badge */}
            <span
                className={`mb-3 inline-block rounded-full border px-3 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest ${isCoord
                    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                    : "border-violet-500/30 bg-violet-500/10 text-violet-300"
                    }`}
            >
                {s.role}
            </span>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{s.name}</h3>

            <div className="mt-3 flex flex-col items-center gap-1.5 w-full">
                <a
                    href={`tel:${s.mobile.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 transition-colors duration-200 hover:text-cyan-300 w-full"
                >
                    <Phone className="h-3 w-3 shrink-0" />
                    <span>{s.mobile}</span>
                </a>
                <a
                    href={`mailto:${s.email}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 transition-colors duration-200 hover:text-cyan-300 w-full"
                >
                    <Mail className="h-3 w-3 shrink-0" />
                    <span className="break-all min-w-0">{s.email}</span>
                </a>
            </div>
        </div>
    );
}

function SectionHeading({ label, sub, accent = "indigo" }: { label: string; sub?: string; accent?: "indigo" | "emerald" }) {
    const viaColor = accent === "emerald" ? "via-emerald-500" : "via-indigo-500";
    const textColor = accent === "emerald" ? "text-emerald-400/80" : "text-indigo-400/80";
    return (
        <div className="mb-8 sm:mb-10 text-center">
            <p className={`mb-2 text-xs uppercase tracking-[0.22em] ${textColor} font-semibold`}>
                {sub ?? "Technova '26"}
            </p>
            <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight"
                style={{ fontFamily: "Eagle Lake, serif" }}
            >
                {label}
            </h2>
            <div className={`mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent ${viaColor} to-transparent`} />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
    return (
        <>
            {/* Scanline keyframe */}
            <style>{`
                @keyframes scanline {
                    0%   { top: -2px; opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>

            <main className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
                {/* Ambient glows */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
                    <div
                        className="absolute -top-24 left-1/2 h-[40vh] w-[80vw] max-w-[700px] -translate-x-1/2 rounded-full blur-[130px]"
                        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.20), transparent 70%)" }}
                    />
                    <div
                        className="absolute bottom-0 right-0 h-[30vh] w-[50vw] max-w-80 rounded-full blur-[100px]"
                        style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.15), transparent 70%)" }}
                    />
                    {/* Extra emerald glow for dev section */}
                    <div
                        className="absolute bottom-[20%] left-0 h-[25vh] w-[40vw] max-w-60 rounded-full blur-[100px]"
                        style={{ background: "radial-gradient(ellipse, rgba(52,211,153,0.08), transparent 70%)" }}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pb-20 pt-20 sm:pt-24 md:pt-28">
                    {/* Back button */}
                    <div className="mb-6 sm:mb-8">
                        <BackButton fallbackPath="/" />
                    </div>

                    {/* ── Hero heading: Teachers ── */}
                    <div className="mb-10 sm:mb-14 lg:mb-16 text-center px-2">
                        <h1
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                            style={{ fontFamily: "Eagle Lake, serif" }}
                        >
                            Teacher Coordinator
                            <span className="block sm:inline"> &amp; Co-Coordinators</span>
                        </h1>
                        <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                    </div>

                    {/* ── Teachers ── */}
                    <section className="mb-16 sm:mb-20">
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {teacherCoordinators.map((t) => (
                                <TeacherCard key={t.name} t={t} />
                            ))}
                        </div>
                    </section>

                    {/* ── Hero heading: Students ── */}
                    <div className="mb-10 sm:mb-14 lg:mb-16 text-center px-2">
                        <h1
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                            style={{ fontFamily: "Eagle Lake, serif" }}
                        >
                            Student Coordinator
                            <span className="block sm:inline"> &amp; Co-Coordinators</span>
                        </h1>
                        <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                    </div>

                    {/* ── Student Coordinators ── */}
                    <section className="mb-16 sm:mb-20">
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {studentCoordinators.map((s) => (
                                <StudentCard key={s.name + s.email} s={s} />
                            ))}
                        </div>
                    </section>

                    {/* ── DEV TEAM ── */}
                    <section className="mb-16 sm:mb-20">
                        {/* Section divider with terminal flavor */}
                        <div className="mb-8 sm:mb-10 text-center">
                            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-emerald-400/80 font-mono font-semibold">
                                Technova '26
                            </p>
                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
                                style={{ fontFamily: "Eagle Lake, serif" }}
                            >
                                <span className="text-emerald-400 font-mono text-base sm:text-lg align-middle mr-2 opacity-60">{"<"}</span>
                                <span className="text-white">Website Development Team</span>
                                <span className="text-emerald-400 font-mono text-base sm:text-lg align-middle ml-2 opacity-60">{"/>"}</span>
                            </h2>
                            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                            <p className="mt-3 text-xs text-slate-500 font-mono">
                                <span className="text-emerald-600">$</span> git log --team=web-dev --format=pretty
                            </p>
                        </div>

                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {webDCoordinators.map((m) => (
                                <DevCard key={m.name} m={m} />
                            ))}
                        </div>
                    </section>

                    {/* ── Contact strip ── */}
                    <div className="group relative rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-8 py-8 sm:py-10 text-center backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_60px_rgba(99,102,241,0.10)]">
                        {/* Subtle animated gradient bg */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.08), transparent 70%)" }}
                        />
                        <h2 className="relative mb-2 text-lg sm:text-xl font-bold text-white">Got a question?</h2>
                        <p className="relative mb-6 text-sm text-slate-400">
                            Reach out to us at&nbsp;
                            <a
                                href="mailto:technova@dcrustm.org"
                                className="text-indigo-300 underline underline-offset-2 hover:text-indigo-200 transition break-all"
                            >
                                technova@dcrustm.org
                            </a>
                        </p>
                        <a
                            href="mailto:technova@dcrustm.org"
                            className="relative inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95"
                        >
                            <Mail className="h-4 w-4" />
                            Email Us
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
