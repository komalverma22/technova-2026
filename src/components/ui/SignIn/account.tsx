import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { API_URL, apiFetch } from "../../../lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  rollNo: string;
  fullName: string;
  email: string;
  mobile: string;
  college: string;
  branch: string;
  semester: string;
  password: string;
  confirmPassword: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

// ── Helpers ───────────────────────────────────────────────────────────────────
function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.rollNo.trim())
    errors.rollNo = "Roll number is required.";

  if (!data.fullName.trim())
    errors.fullName = "Full name is required.";
  else if (data.fullName.trim().length < 2)
    errors.fullName = "Name must be at least 2 characters.";

  if (!data.email.trim())
    errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";

  if (!data.mobile.trim())
    errors.mobile = "Mobile number is required.";
  else if (!/^[6-9]\d{9}$/.test(data.mobile))
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";

  if (!data.college.trim())
    errors.college = "College name is required.";

  if (!data.branch.trim())
    errors.branch = "Branch is required.";

  const sem = Number(data.semester);
  if (!data.semester)
    errors.semester = "Semester is required.";
  else if (!Number.isInteger(sem) || sem < 1 || sem > 8)
    errors.semester = "Semester must be between 1 and 8.";

  if (!data.password)
    errors.password = "Password is required.";
  else if (data.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  else if (!/[A-Z]/.test(data.password))
    errors.password = "Include at least one uppercase letter.";
  else if (!/[0-9]/.test(data.password))
    errors.password = "Include at least one number.";

  if (!data.confirmPassword)
    errors.confirmPassword = "Please confirm your password.";
  else if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  return errors;
}

// ── Reusable field wrapper ────────────────────────────────────────────────────
function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-200"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

// ── Password input with show/hide toggle ─────────────────────────────────────
function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  error,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? "••••••••"}
        autoComplete={id === "password" ? "new-password" : "new-password"}
        className={cn(
          "w-full rounded-lg border bg-slate-800/60 px-3 py-2.5 pr-10 text-sm text-white placeholder-slate-500 outline-none transition",
          "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
          error
            ? "border-red-500/70 focus:ring-red-500"
            : "border-slate-600/60 hover:border-slate-500"
        )}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
        tabIndex={-1}
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

// ── Text input ────────────────────────────────────────────────────────────────
function TextInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  inputMode,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      inputMode={inputMode}
      className={cn(
        "w-full rounded-lg border bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition",
        "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
        error
          ? "border-red-500/70 focus:ring-red-500"
          : "border-slate-600/60 hover:border-slate-500"
      )}
    />
  );
}

// ── Main SignupForm ────────────────────────────────────────────────────────────
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState<FormData>({
    rollNo: "",
    fullName: "",
    email: "",
    mobile: "",
    college: "",
    branch: "",
    semester: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear that field's error as the user types
    setFieldErrors((prev) => ({ ...prev, [id]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const response = await apiFetch(`${API_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({
          rollNo: formData.rollNo,
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          college: formData.college,
          branch: formData.branch,
          semester: Number(formData.semester),
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      setShowOtp(true);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (showOtp) {
    return <OtpVerification email={formData.email} />;
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card className="border-slate-700/50 bg-slate-900/80 backdrop-blur-sm shadow-2xl">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Create your account
          </CardTitle>
          <CardDescription className="text-slate-400">
            Register for TechNova'26 — fill in your details below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-5">

              {/* ── Important notice ── */}
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300 space-y-1.5">
                <p className="font-semibold text-amber-200 flex items-center gap-1.5">
                  ⚠️ Please read before filling the form
                </p>
                <ul className="list-disc list-inside space-y-1 text-amber-300/90">
                  <li>
                    Fill in all details <span className="font-semibold text-amber-200">carefully and accurately</span> — your name, roll number, branch, and college will appear exactly as entered on your <span className="font-semibold text-amber-200">participation certificate</span>.
                  </li>
                  <li>
                    <span className="font-semibold text-amber-200">Remember your password.</span> There is currently no password-reset option — if you forget it, you will need to contact the organisers.
                  </li>
                </ul>
              </div>

              {/* Server error */}
              {serverError && (
                <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {serverError}
                </div>
              )}

              {/* ── Row 1: Roll No + Full Name ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Roll No." id="rollNo" error={fieldErrors.rollNo}>
                  <TextInput
                    id="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    placeholder="e.g. 24001001901"
                    error={fieldErrors.rollNo}
                  />
                </FormField>

                <FormField label="Full Name" id="fullName" error={fieldErrors.fullName}>
                  <TextInput
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Astro Prime"
                    error={fieldErrors.fullName}
                  />
                </FormField>
              </div>

              {/* ── Row 2: Email + Mobile ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Email" id="email" error={fieldErrors.email}>
                  <TextInput
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="astroprime@example.com"
                    inputMode="email"
                    error={fieldErrors.email}
                  />
                </FormField>

                <FormField label="Mobile Number" id="mobile" error={fieldErrors.mobile}>
                  <TextInput
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                    inputMode="numeric"
                    error={fieldErrors.mobile}
                  />
                </FormField>
              </div>

              {/* ── Row 3: College (full width) ── */}
              <FormField label="College/University Name" id="college" error={fieldErrors.college}>
                <TextInput
                  id="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="DCRUST, Murthal"
                  error={fieldErrors.college}
                />
              </FormField>

              {/* ── Row 4: Branch + Semester ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Branch" id="branch" error={fieldErrors.branch}>
                  <TextInput
                    id="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    placeholder="Computer Science"
                    error={fieldErrors.branch}
                  />
                </FormField>

                <FormField label="Semester" id="semester" error={fieldErrors.semester}>
                  <TextInput
                    id="semester"
                    type="number"
                    value={formData.semester}
                    onChange={handleChange}
                    placeholder="1 – 8"
                    inputMode="numeric"
                    error={fieldErrors.semester}
                  />
                </FormField>
              </div>

              {/* ── Row 5: Password + Confirm Password ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Password" id="password" error={fieldErrors.password}>
                  <PasswordInput
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={fieldErrors.password}
                  />
                </FormField>

                <FormField
                  label="Confirm Password"
                  id="confirmPassword"
                  error={fieldErrors.confirmPassword}
                >
                  <PasswordInput
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    error={fieldErrors.confirmPassword}
                  />
                </FormField>
              </div>

              <p className="text-xs text-slate-500">
                Password must be at least 8 characters and include an uppercase letter and a number.
              </p>

              {/* ── Submit ── */}
              <Button
                type="submit"
                variant="white"
                disabled={loading}
                className="w-full mt-1 py-2.5 text-sm font-semibold"
              >
                {loading ? "Creating account…" : "Create Account"}
              </Button>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="mt-4 px-4 text-center text-xs text-slate-500">
        By creating an account you agree to our{" "}
        <a href="#" className="underline hover:text-slate-300">Terms of Service</a> and{" "}
        <a href="#" className="underline hover:text-slate-300">Privacy Policy</a>.
      </p>
    </div>
  );
}

// ── OTP Verification (unchanged logic, re-styled) ─────────────────────────────
function OtpVerification({ email }: { email: string }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await apiFetch(`${API_URL}/verify-otp`, {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "OTP verification failed");
      if (data.token) {
        document.cookie = `token=${data.token}; path=/;`;
      }
      setSuccess(true);
      setTimeout(() => { window.location.href = "/"; }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="mx-auto w-full max-w-sm border-slate-700/50 bg-slate-900/80">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-green-400">✓ Verified!</CardTitle>
          <CardDescription>
            Your account has been verified. Redirecting…
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-sm border-slate-700/50 bg-slate-900/80 backdrop-blur-sm shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-white">Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a 6-digit OTP to <strong className="text-slate-200">{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="otp" className="text-sm font-medium text-slate-200">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="w-full rounded-lg border border-slate-600/60 bg-slate-800/60 px-3 py-2.5 text-center text-2xl tracking-[0.5em] text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <Button
            type="submit"
            variant="white"
            disabled={loading || otp.length !== 6}
            className="w-full py-2.5 font-semibold"
          >
            {loading ? "Verifying…" : "Verify OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}