"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CustomTextField } from "@/components/CustomTextField";
import { Search, Mail, AtSign, DollarSign, Lock, Eye, EyeOff, User } from "lucide-react";

// ────────────────────────────────────────────────────────────────
// Shared UI helpers
// ────────────────────────────────────────────────────────────────

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-6 border-t border-slate-100 pt-6">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        Installation & Usage
      </Label>
      <Badge
        variant="outline"
        className="text-[10px] bg-slate-50 text-slate-500 font-mono tracking-widest border-slate-200"
      >
        import CustomTextField
      </Badge>
    </div>
    <pre className="p-5 rounded-2xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[13px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

function Section({ title, code, children }: { title: string; code?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {title}
      </Label>
      {children}
      {code && <CodeBlock code={code} />}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────

export default function TextFieldPage() {
  const [email, setEmail]       = useState("");
  const [username, setUsername] = useState("");
  const [amount, setAmount]     = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch]     = useState("");
  const [fullName, setFullName] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Text Field (Configurable)
            </h2>
            <p className="text-lg text-slate-500">
              Fully configurable input fields — supports validation, states, icons, and character limits.
            </p>
          </div>

          {/* ── Controlled State Cheatsheet ─────────────────────────── */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
            <p className="text-sm font-semibold text-amber-900 mb-3">📌 Controlled State — Two API options</p>
            <pre className="text-[12.5px] font-mono text-amber-800 leading-relaxed overflow-x-auto whitespace-pre-wrap">{`// ✅ Option 1 — Standard React onChange (receives the native event)
//    Use when you already have a handleChange function, like in a form library.
const [name, setName] = useState("");

<CustomTextField
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// ✅ Option 2 — onValueChange convenience (receives the string value directly)
//    Great for simple local state — no need to access the event object.
<CustomTextField
  value={name}
  onValueChange={(value) => setName(value)}
  // or even shorter:
  onValueChange={setName}
/>`}</pre>
          </div>

          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">

            {/* ── LIVE: Password field with eye-toggle ── */}
            <Section
              title="Password Field with Eye Toggle (Real-world usage)"
              code={`import { useState } from "react";
import { CustomTextField } from "@/components/CustomTextField";
import { Lock, Eye, EyeOff } from "lucide-react";

const [password, setPassword] = useState("");
const [showPass, setShowPass] = useState(false);

<div className="relative">
  <CustomTextField
    type={showPass ? "text" : "password"}
    label="Password"
    placeholder="At least 8 characters"
    leadingIcon={<Lock size={16} />}
    value={password}
    onChange={(e) => setPassword(e.target.value)}  // ← standard React pattern
    validateOn="blur"
    validate={(val) => {
      if (val.length < 8) return "Must be at least 8 characters.";
      if (!/[A-Z]/.test(val)) return "Must contain an uppercase letter.";
      if (!/[0-9]/.test(val)) return "Must contain a number.";
      return true;
    }}
    successMessage="Strong password!"
    inputStyle={{ paddingRight: 44 }}   /* make room for the eye button */
  />
  {/* Eye toggle sits inside the input — uses absolute positioning */}
  <button
    type="button"
    onClick={() => setShowPass(!showPass)}
    className="absolute right-3 top-[34px] -translate-y-0 text-slate-400
               hover:text-slate-700 focus:outline-none cursor-pointer p-1"
    aria-label={showPass ? "Hide password" : "Show password"}
  >
    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</div>`}
            >
              <div className="relative">
                <CustomTextField
                  type={showPass ? "text" : "password"}
                  label="Password"
                  placeholder="At least 8 characters"
                  leadingIcon={<Lock size={16} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validateOn="blur"
                  validate={(val) => {
                    if (val.length < 8) return "Must be at least 8 characters.";
                    if (!/[A-Z]/.test(val)) return "Must contain an uppercase letter.";
                    if (!/[0-9]/.test(val)) return "Must contain a number.";
                    return true;
                  }}
                  successMessage="Strong password!"
                  inputStyle={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 text-slate-400 hover:text-slate-700 focus:outline-none cursor-pointer p-1"
                  style={{ top: 34 }}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── Standard onChange ── */}
            <Section
              title="Standard React onChange (e.target.value pattern)"
              code={`const [fullName, setFullName] = useState("");

// Works exactly like a native <input>
<CustomTextField
  type="text"
  label="Full Name"
  placeholder="Enter full name"
  leadingIcon={<User size={16} />}
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  maxLength={60}
/>`}
            >
              <CustomTextField
                type="text"
                label="Full Name"
                placeholder="Enter full name"
                leadingIcon={<User size={16} />}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={60}
                charCounter
                helperText={`"onChange={(e) => setFullName(e.target.value)}" — standard React pattern`}
              />
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── onValueChange convenience ── */}
            <Section
              title="onValueChange (string value convenience)"
              code={`const [email, setEmail] = useState("");

// onValueChange receives the string directly — no event needed
<CustomTextField
  type="email"
  label="Email address"
  placeholder="you@example.com"
  leadingIcon={<Mail size={16} />}
  value={email}
  onValueChange={(value) => setEmail(value)}
  // even shorter — pass setState directly:
  onValueChange={setEmail}
  clearable
  validateOn="blur"
  errorMessage="Please enter a valid email address."
  successMessage="Email looks good!"
/>`}
            >
              <CustomTextField
                type="email"
                label="Email address"
                placeholder="you@example.com"
                leadingIcon={<Mail size={16} />}
                helperText={`"onValueChange={setEmail}" — receives string value directly`}
                clearable
                validateOn="blur"
                errorMessage="Please enter a valid email address."
                successMessage="Email looks good!"
                value={email}
                onValueChange={setEmail}
              />
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── Username with Validation ── */}
            <Section
              title="Username with Validation"
              code={`<CustomTextField
  type="text"
  label="Username"
  placeholder="only_letters_and_numbers"
  leadingIcon={<AtSign size={16} />}
  charCounter
  maxLength={20}
  minLength={3}
  pattern="[a-zA-Z0-9_]+"
  validateOn="input"
  errorMessage="Only letters, numbers, and underscores allowed."
  successMessage="Username is available!"
  value={username}
  onValueChange={(value) => setUsername(value)}
/>`}
            >
              <CustomTextField
                type="text"
                label="Username"
                placeholder="only_letters_and_numbers"
                leadingIcon={<AtSign size={16} />}
                helperText="3–20 characters, letters and numbers only."
                clearable
                charCounter
                maxLength={20}
                minLength={3}
                pattern="[a-zA-Z0-9_]+"
                validateOn="input"
                errorMessage="Only letters, numbers, and underscores allowed."
                successMessage="Username is available!"
                value={username}
                onValueChange={(value) => setUsername(value)}
              />
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── Number ── */}
            <Section
              title="Number & Bounds"
              code={`<CustomTextField
  type="number"
  label="Amount (USD)"
  placeholder="0.00"
  leadingIcon={<DollarSign size={16} />}
  min={1}
  max={10000}
  step={0.01}
  validateOn="blur"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  colors={{ focus: "#1D9E75", success: "#1D9E75" }}
/>`}
            >
              <CustomTextField
                type="number"
                label="Amount (USD)"
                placeholder="0.00"
                leadingIcon={<DollarSign size={16} />}
                helperText="Enter an amount between 1 and 10,000."
                min={1}
                max={10000}
                step={0.01}
                validateOn="blur"
                errorMessage="Amount must be between $1 and $10,000."
                successMessage="Valid amount!"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                colors={{ focus: "#1D9E75", success: "#1D9E75" }}
              />
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── Filled / Search ── */}
            <Section
              title="Filled Search Variant"
              code={`<CustomTextField
  type="search"
  placeholder="Search anything..."
  leadingIcon={<Search size={16} />}
  variant="filled"
  clearable
  size="md"
  borderRadius={24}
  value={search}
  onValueChange={setSearch}
  colors={{ focus: "#BA7517" }}
/>`}
            >
              <CustomTextField
                type="search"
                placeholder="Search anything..."
                leadingIcon={<Search size={16} />}
                variant="filled"
                clearable
                validateOn="none"
                size="md"
                borderRadius={24}
                value={search}
                onValueChange={setSearch}
                colors={{ focus: "#BA7517" }}
              />
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── Other States ── */}
            <Section
              title="Other States"
              code={`// Read-only
<CustomTextField type="text" label="Account ID" value="ACC-2024-88f3a" readOnly />

// Disabled
<CustomTextField type="text" label="Referral code" value="PROMO2025" disabled />

// Underline variant
<CustomTextField type="text" label="Nickname" variant="underline" optional size="lg" />`}
            >
              <div className="space-y-6 mt-4">
                <CustomTextField
                  type="text"
                  label="Account ID"
                  value="ACC-2024-88f3a"
                  readOnly
                  helperText="This value is assigned automatically. (Read Only)"
                  colors={{ border: "#C8C7C0" }}
                />
                <CustomTextField
                  type="text"
                  label="Referral code"
                  value="PROMO2025"
                  disabled
                  helperText="Referral codes cannot be changed. (Disabled)"
                />
                <CustomTextField
                  type="text"
                  label="Nickname"
                  placeholder="What should we call you?"
                  variant="underline"
                  helperText="Displayed on your public profile. (Underline)"
                  clearable
                  optional
                  size="lg"
                  colors={{ focus: "#7F77DD" }}
                />
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
