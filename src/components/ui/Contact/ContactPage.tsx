import { Mail, Phone } from "lucide-react";
import Footer from "../Footer/Footer";
import { BackButton } from "../BackButton";

// ─────────────────────────────────────────────────────────────────────────────
// DATA — replace placeholders with real info
// ─────────────────────────────────────────────────────────────────────────────

interface Teacher {
    name: string;
    designation: string;
    eventRole: string;
    photo: string;
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
        name: "Komal Verma",
        designation: "Department of Computer Science and Engineering",
        eventRole: "Web-Dev Coordinator, Technova'26",
        photo: "/coordinator-placeholder.png",
    },
    {
        name: "Abhishek Saini",
        designation: "Department of Computer Science and Engineering",
        eventRole: "Web-Dev Co-Coordinator, Technova'26",
        photo: "/coordinator-placeholder.png",
    },
    {
        name: "Piyush Yadav",
        designation: "Department of Computer Science and Engineering",
        eventRole: "Web-Dev Member, Technova'26",
        photo: "/coordinator-placeholder.png",
    },
    {
        name: "Sahil Ninania",
        designation: "Department of Computer Science and Engineering",
        eventRole: "Web-Dev Member, Technova'26",
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
        name: "Shiv",
        mobile: "+91 00000 00000",
        email: "student3@example.com",
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
        <div className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-sm transition hover:border-indigo-500/40 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]">
            {/* Glow ring on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-indigo-500/30 transition group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative mb-3 sm:mb-4 h-20 w-20 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-indigo-500/40 shadow-lg shadow-indigo-900/30">
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
            <span className="mb-3 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                Faculty
            </span>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{t.name}</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">{t.designation}</p>
            <p className="mt-2 text-xs font-medium text-indigo-300/80 leading-relaxed">{t.eventRole}</p>
        </div>
    );
}

function StudentCard({ s }: { s: Student }) {
    const isCoord = s.role === "Coordinator";
    return (
        <div className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-sm transition hover:border-cyan-500/40 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]">
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-cyan-500/30 transition group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative mb-3 sm:mb-4 h-20 w-20 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-cyan-500/40 shadow-lg shadow-cyan-900/20">
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
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 transition hover:text-cyan-300 w-full"
                >
                    <Phone className="h-3 w-3 shrink-0" />
                    <span>{s.mobile}</span>
                </a>
                <a
                    href={`mailto:${s.email}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 transition hover:text-cyan-300 w-full"
                >
                    <Mail className="h-3 w-3 shrink-0" />
                    <span className="break-all min-w-0">{s.email}</span>
                </a>
            </div>
        </div>
    );
}

function SectionHeading({ label, sub }: { label: string; sub?: string }) {
    return (
        <div className="mb-8 sm:mb-10 text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-indigo-400/80 font-semibold">
                {sub ?? "Technova '26"}
            </p>
            <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight"
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
                {/* Ambient glows — clamped so they don't overflow on narrow screens */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
                    <div
                        className="absolute -top-24 left-1/2 h-[40vh] w-[80vw] max-w-[700px] -translate-x-1/2 rounded-full blur-[130px]"
                        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.20), transparent 70%)" }}
                    />
                    <div
                        className="absolute bottom-0 right-0 h-[30vh] w-[50vw] max-w-80 rounded-full blur-[100px]"
                        style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.15), transparent 70%)" }}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pb-20 pt-20 sm:pt-24 md:pt-28">
                    {/* Back button */}
                    <div className="mb-6 sm:mb-8">
                        <BackButton fallbackPath="/" />
                    </div>

                    {/* Hero heading */}
                    <div className="mb-10 sm:mb-14 lg:mb-16 text-center px-2">
                        <h1
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                            style={{ fontFamily: "Eagle Lake, serif" }}
                        >
                            Student Coordinator
                            {/* line-break only on very small screens to avoid single long word wrapping oddly */}
                            <span className="block sm:inline"> &amp; Co-Coordinators</span>
                        </h1>
                        <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                    </div>



                    {/* ── Student Coordinators ── */}
                    <section className="mb-16 sm:mb-20">
                        {/* 1 col on xs, 2 on sm, 3 on lg, 4 on xl */}
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {studentCoordinators.map((s) => (
                                <StudentCard key={s.name + s.email} s={s} />
                            ))}
                        </div>
                    </section>
                    {/* ── DEV TEAM ── */}
                    <section className="mb-16 sm:mb-20">
                        <SectionHeading label="Website Development Team" sub="" />
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {teacherCoordinators.map((t) => (
                                <TeacherCard key={t.name} t={t} />
                            ))}
                        </div>
                    </section>
                    {/* Contact strip */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-8 py-8 sm:py-10 text-center backdrop-blur-sm">
                        <h2 className="mb-2 text-lg sm:text-xl font-bold text-white">Got a question?</h2>
                        <p className="mb-6 text-sm text-slate-400">
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
                            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-95"
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
