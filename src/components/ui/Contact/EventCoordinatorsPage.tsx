import { Phone, Mail } from "lucide-react";
import Footer from "../Footer/Footer";
import { BackButton } from "../BackButton";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────────────────────────────────────

interface EventCoordinator {
    name: string;
    phone: string;
}

interface Event {
    name: string;
    coordinators: EventCoordinator[];
}

interface DepartmentCoordinators {
    StudentCoordinator: {
        name: string;
        phone: string;
    };
    StudentCoCoordinator: {
        name: string;
        phone: string;
    };
    events: {
        [eventName: string]: EventCoordinator[];
    };
}

const coordinatorsData: Record<string, DepartmentCoordinators> = {
    "NAVRA School of Management": {
        StudentCoordinator: {
            name: "Archana",
            phone: "7015114622",
        },
        StudentCoCoordinator: {
            name: "Suraj",
            phone: "9546716342",
        },
        events: {
            "Innovation Odyssey Challenge": [
                { name: "Rishit (Coordinator)", phone: "98190 98697" },
                { name: "Himanshu", phone: "9143588007" },
                { name: "Bhoomi", phone: "9817413591" },
            ],
            "Cyber Canvas": [
                { name: "Harsh Kr (Coordinator)", phone: "98114 13309" },
                { name: "Anjali Mishra", phone: "7701 991 302" },
                { name: "Ankit Jangra", phone: "85699 57020" },
            ],
            "Trail of Organisers": [{ name: "Nandini", phone: "7988439289" }],
        },
    },
    "Chemical Engineering": {
        StudentCoordinator: {
            name: "NARSHI",
            phone: "8166969968",
        },
        StudentCoCoordinator: {
            name: "MAYANK MANN",
            phone: "7016416269",
        },
        events: {
            "Knowledge Knockout Quiz": [
                { name: "Surbhi", phone: "8708408833" },
                { name: "Rajni", phone: "8059332247" },
                { name: "Parita Singh", phone: "9350203487" },
            ],
            "GRY (Get Recognised For Your Talent)": [
                { name: "Aashu", phone: "961671119" },
                { name: "Khwahish Kumar", phone: "8178477951" },
                { name: "Disha", phone: "7015473578" },
            ],
            ChemSpark: [
                { name: "Bharti Devi", phone: "87652238" },
                { name: "Bhoomi", phone: "8168573726" },
                { name: "Aayush Mishra", phone: "9334808555" },
            ],
        },
    },
    "Management Studies (TECHNOVA-2026)": {
        StudentCoordinator: {
            name: "Nikita Singh",
            phone: "8278907980",
        },
        StudentCoCoordinator: {
            name: "Sunny Saini",
            phone: "7015463534",
        },
        events: {
            "Team Titans": [
                { name: "Hemant", phone: "9992551171" },
                { name: "Purvi", phone: "7988909541" },
                { name: "Sarika", phone: "9992560565" },
            ],
            "Brand Storm": [
                { name: "Apsara", phone: "8816950480" },
                { name: "Anjali", phone: "8688525081" },
                { name: "Jatin", phone: "9991224661" },
            ],
        },
    },
    "ThinkBots Society": {
        StudentCoordinator: {
            name: "Sahil Kumar",
            phone: "8168606627",
        },
        StudentCoCoordinator: {
            name: "Harshit Gupta",
            phone: "8318457562",
        },
        events: {
            "Walking Dead": [
                { name: "Pritam", phone: "9812015241" },
                { name: "Sahil Kumar", phone: "8168606627" },
                { name: "Bhavana", phone: "8950293115" },
            ],
            "Dungeon Drive": [
                { name: "Sahil Kumar", phone: "8168606627" },
                { name: "Harshit Gupta", phone: "8318457562" },
                { name: "Pritam", phone: "9812015241" },
            ],
        },
    },
    "Excel DCRUSTM": {
        StudentCoordinator: {
            name: "Aryan Beniwal",
            phone: "9728762999",
        },
        StudentCoCoordinator: {
            name: "Anshu Kumar",
            phone: "9468190812",
        },
        events: {
            "Mis-Matched": [
                { name: "Akshat", phone: "989565691" },
                { name: "Amit Kumar", phone: "9345805135" },
                { name: "Harsh Sindal", phone: "2307273876" },
            ],
            "Corporate Clash": [
                { name: "Garv", phone: "7082398051" },
                { name: "Lavisha Goyal", phone: "9253278847" },
                { name: "Sundich Chauhan", phone: "8510077880" },
            ],
        },
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function DepartmentSection({ name, data }: { name: string; data: DepartmentCoordinators }) {
    return (
        <section className="mb-12 sm:mb-16">
            <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6 sm:p-8 backdrop-blur-sm overflow-hidden">
                {/* Background glow */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08), transparent 70%)" }}
                />

                {/* Department Header */}
                <div className="relative mb-8 sm:mb-10">
                    <h2
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4"
                        style={{ fontFamily: "Eagle Lake, serif" }}
                    >
                        {name}
                    </h2>

                    {/* Department Coordinators - Inline Cards */}
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-auto">
                        {/* Student Coordinator */}
                        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-3 backdrop-blur-sm">
                            <p className="text-[10px] uppercase tracking-widest text-cyan-400/60 font-semibold mb-1">
                                Student Coordinator
                            </p>
                            <p className="text-sm font-semibold text-white">{data.StudentCoordinator.name}</p>
                            <a
                                href={`tel:${data.StudentCoordinator.phone.replace(/\s/g, "")}`}
                                className="mt-1 inline-flex items-center gap-1.5 text-xs text-cyan-300/70 hover:text-cyan-300 transition-colors"
                            >
                                <Phone className="h-3 w-3 shrink-0" />
                                {data.StudentCoordinator.phone}
                            </a>
                        </div>

                        {/* Student Co-Coordinator */}
                        <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 px-4 py-3 backdrop-blur-sm">
                            <p className="text-[10px] uppercase tracking-widest text-violet-400/60 font-semibold mb-1">
                                Student Co-Coordinator
                            </p>
                            <p className="text-sm font-semibold text-white">{data.StudentCoCoordinator.name}</p>
                            <a
                                href={`tel:${data.StudentCoCoordinator.phone.replace(/\s/g, "")}`}
                                className="mt-1 inline-flex items-center gap-1.5 text-xs text-violet-300/70 hover:text-violet-300 transition-colors"
                            >
                                <Phone className="h-3 w-3 shrink-0" />
                                {data.StudentCoCoordinator.phone}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Events */}
                <div className="relative space-y-6">
                    {Object.entries(data.events).map(([eventName, coordinators]) => (
                        <div key={eventName} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 backdrop-blur-sm">
                            {/* Event Title */}
                            <h3 className="mb-4 text-base sm:text-lg font-bold text-white">{eventName}</h3>

                            {/* Coordinators Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-white/5">
                                            <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">
                                                Name
                                            </th>
                                            <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">
                                                Phone
                                            </th>
                                            <th className="px-3 sm:px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                                                Contact
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {coordinators.map((coord, idx) => (
                                            <tr
                                                key={idx}
                                                className="transition-colors duration-200 hover:bg-white/5"
                                            >
                                                <td className="px-3 sm:px-4 py-3 text-white font-medium">{coord.name}</td>
                                                <td className="px-3 sm:px-4 py-3 text-slate-300 font-mono text-xs sm:text-sm">
                                                    {coord.phone}
                                                </td>
                                                <td className="px-3 sm:px-4 py-3 text-center">
                                                    <a
                                                        href={`tel:${coord.phone.replace(/\s/g, "")}`}
                                                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:border-indigo-500/60 hover:bg-indigo-500/20 hover:text-indigo-200 transition-all duration-200"
                                                        title={`Call ${coord.name}`}
                                                    >
                                                        <Phone className="h-3.5 w-3.5" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function EventCoordinatorsPage() {
    return (
        <>
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
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 pb-20 pt-20 sm:pt-24 md:pt-28">
                    {/* Back button */}
                    <div className="mb-6 sm:mb-8">
                        <BackButton fallbackPath="/" />
                    </div>

                    {/* Hero heading */}
                    <div className="mb-12 sm:mb-16 lg:mb-20 text-center px-2">
                        <h1
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                            style={{ fontFamily: "Eagle Lake, serif" }}
                        >
                            Event Coordinators
                        </h1>
                        <p className="mt-4 text-base text-slate-400">
                            Contact information for all event coordinators and co-coordinators
                        </p>
                        <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                    </div>

                    {/* Departments & Events */}
                    <div className="space-y-10 sm:space-y-12">
                        {Object.entries(coordinatorsData).map(([deptName, deptData]) => (
                            <DepartmentSection key={deptName} name={deptName} data={deptData} />
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="group relative mt-16 sm:mt-20 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-8 py-8 sm:py-10 text-center backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_60px_rgba(99,102,241,0.10)]">
                        <div
                            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.08), transparent 70%)" }}
                        />
                        <h2 className="relative mb-2 text-lg sm:text-xl font-bold text-white">
                            Need assistance?
                        </h2>
                        <p className="relative mb-6 text-sm text-slate-400">
                            For general inquiries, contact us at&nbsp;
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
