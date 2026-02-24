import { Mail, Phone } from "lucide-react";
import Footer from "../Footer/Footer";
import { BackButton } from "../BackButton";

// ─────────────────────────────────────────────────────────────────────────────
// DATA — replace placeholders with real info
// ─────────────────────────────────────────────────────────────────────────────

interface Teacher {
    name: string;
    designation: string;   // e.g. "Associate Professor, CSE"
    eventRole: string;     // e.g. "Faculty Coordinator, Technova'26"
    photo: string;         // path under /public, e.g. "/coordinators/dr-sharma.jpg"
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
        name: "Dr. Teacher Name",
        designation: "Professor, Department Name",
        eventRole: "Faculty Coordinator, Technova'26",
        photo: "/coordinator-placeholder.png",
    },
    {
        name: "Dr. Teacher Name 2",
        designation: "Associate Professor, Department Name",
        eventRole: "Faculty Co-Coordinator, Technova'26",
        photo: "/coordinator-placeholder.png",
    },
];

const studentCoordinators: Student[] = [
    {
        name: "Rishi",
        mobile: "+91 00000 00000",
        email: "student@example.com",
        role: "Coordinator",
        photo: "/coordinator-placeholder.png",
    },
    {
        name: "Aditya Aggarwal",
        mobile: "+91 00000 00000",
        email: "student2@example.com",
        role: "Co-Coordinator",
        photo: "/coordinator-placeholder.png",
    },
    {
        name: "Nandini",
        mobile: "+91 00000 00000",
        email: "student3@example.com",
        role: "Co-Coordinator",
        photo: "/coordinator-placeholder.png",
    },
];
// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function TeacherCard({ t }: { t: Teacher }) {
    return (
        <div className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:border-indigo-500/40 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]">
            {/* Glow ring on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-indigo-500/30 transition group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-indigo-500/40 shadow-lg shadow-indigo-900/30">
                <img
                    src={t.photo}
                    alt={t.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=1e2748&color=a5b4fc&size=128&bold=true`;
                    }}
                />
            </div>

            {/* Role badge */}
            <span className="mb-3 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                Faculty
            </span>

            <h3 className="text-base font-bold text-white leading-snug">{t.name}</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">{t.designation}</p>
            <p className="mt-2 text-xs font-medium text-indigo-300/80 leading-relaxed">{t.eventRole}</p>
        </div>
    );
}

function StudentCard({ s }: { s: Student }) {
    const isCoord = s.role === "Coordinator";
    return (
        <div className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:border-cyan-500/40 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]">
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-cyan-500/30 transition group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-cyan-500/40 shadow-lg shadow-cyan-900/20">
                <img
                    src={s.photo}
                    alt={s.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=0d2030&color=67e8f9&size=128&bold=true`;
                    }}
                />
            </div>

            {/* Role badge */}
            <span
                className={`mb-3 inline-block rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest ${isCoord
                        ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                        : "border-violet-500/30 bg-violet-500/10 text-violet-300"
                    }`}
            >
                {s.role}
            </span>

            <h3 className="text-base font-bold text-white leading-snug">{s.name}</h3>

            <div className="mt-3 flex flex-col gap-1.5">
                <a
                    href={`tel:${s.mobile.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 transition hover:text-cyan-300"
                >
                    <Phone className="h-3 w-3" />
                    {s.mobile}
                </a>
                <a
                    href={`mailto:${s.email}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 transition hover:text-cyan-300 break-all"
                >
                    <Mail className="h-3 w-3" />
                    {s.email}
                </a>
            </div>
        </div>
    );
}

function SectionHeading({ label, sub }: { label: string; sub?: string }) {
    return (
        <div className="mb-10 text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-indigo-400/80 font-semibold">
                {sub ?? "Technova '26"}
            </p>
            <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
                style={{ fontFamily: "Eagle Lake, serif" }}
            >
                {label}
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
    return (
        <>
            <main className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
                {/* Ambient glows */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
                    <div
                        className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[160px]"
                        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.20), transparent 70%)" }}
                    />
                    <div
                        className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-[130px]"
                        style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.15), transparent 70%)" }}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 md:pt-28 lg:px-8">
                    {/* Back button */}
                    <div className="mb-8">
                        <BackButton fallbackPath="/" />
                    </div>

                    {/* Hero heading */}
                    <div className="mb-20 text-center">
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
                            style={{ fontFamily: "Eagle Lake, serif" }}
                        >
                            Our Coordinators
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
                            The people behind Technova'26 — faculty who guide and students who drive the event forward.
                        </p>
                        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                    </div>

                    {/* ── Teacher Coordinators ── */}
                    <section className="mb-20">
                        <SectionHeading label="Faculty Coordinators and Co-Coordinators" sub="" />
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {teacherCoordinators.map((t) => (
                                <TeacherCard key={t.name} t={t} />
                            ))}
                        </div>
                    </section>


                    {/* Divider */}
                    <div className="my-16 flex items-center gap-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <span className="text-xs uppercase tracking-widest text-white/30 font-semibold">Student Team</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* ── Student Coordinators ── */}
                    <section className="mb-20">
                        <SectionHeading label="Student Coordinators and Co-Coordinators" sub="" />
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {studentCoordinators.map((s) => (
                                <StudentCard key={s.name + s.email} s={s} />
                            ))}
                        </div>
                    </section>
                    {/* Contact strip */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur-sm">
                        <h2 className="mb-2 text-xl font-bold text-white">Got a question?</h2>
                        <p className="mb-6 text-sm text-slate-400">
                            Reach out to us at&nbsp;
                            <a
                                href="mailto:technova@dcrustm.org"
                                className="text-indigo-300 underline underline-offset-2 hover:text-indigo-200 transition"
                            >
                                technova@dcrustm.org
                            </a>
                        </p>
                        <a
                            href="mailto:technova@dcrustm.org"
                            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
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
