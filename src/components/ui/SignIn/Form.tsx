import { SignupForm } from "./account";
import { BackButton } from "../BackButton";

export default function SignupPage() {
  return (
    <div className="relative min-h-svh bg-slate-950 flex items-start sm:items-center justify-center px-4 py-12 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="mb-4">
          <BackButton fallbackPath="/" />
        </div>
        {/* Logo / brand */}
        <div className="mb-8 text-center">
          <a href="/" className="inline-block">
            <span
              className="text-3xl font-bold tracking-tight text-white"
              style={{ fontFamily: "Eagle Lake, serif" }}
            >
              TÉCHNOVA'26
            </span>
          </a>
          <p className="mt-1 text-sm text-slate-400">
            Register to participate in events
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
