"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CustomTextField } from "@/components/CustomTextField";
import { Search, Mail, AtSign, DollarSign, Lock } from "lucide-react";

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
        npm i onebi-ui
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

export default function TextFieldPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Text Field (Configurable)
            </h2>
            <p className="text-lg text-slate-500">
              Fully configurable input fields supporting validation, states, icons, and character limits.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <Section title="Email Field" code={`<CustomTextField
  type="email"
  label="Email address"
  placeholder="you@example.com"
  leadingIcon={<Mail size={16} />}
  helperText="We'll never share your email."
  clearable
  validateOn="blur"
  errorMessage="Please enter a valid email address."
  successMessage="Email looks good!"
/>`}>
              <CustomTextField
                type="email"
                label="Email address"
                placeholder="you@example.com"
                leadingIcon={<Mail size={16} />}
                helperText="We'll never share your email."
                clearable
                validateOn="blur"
                errorMessage="Please enter a valid email address."
                successMessage="Email looks good!"
                value={email}
                onChange={(val) => setEmail(val)}
              />
            </Section>
            
            <Separator className="bg-slate-100" />
            
            <Section title="Username with Validation" code={`<CustomTextField
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
/>`}>
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
                onChange={(val) => setUsername(val)}
              />
            </Section>
            
            <Separator className="bg-slate-100" />
            
            <Section title="Number & Bounds" code={`<CustomTextField
  type="number"
  label="Amount (USD)"
  placeholder="0.00"
  leadingIcon={<DollarSign size={16} />}
  min={1}
  max={10000}
  step={0.01}
  validateOn="blur"
  colors={{ focus: "#1D9E75", success: "#1D9E75" }}
/>`}>
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
                onChange={(val) => setAmount(val)}
                colors={{ focus: "#1D9E75", success: "#1D9E75" }}
              />
            </Section>
            
            <Separator className="bg-slate-100" />
            
            <Section title="Password & Custom Validation" code={`<CustomTextField
  type="password"
  label="Password"
  placeholder="At least 8 characters"
  leadingIcon={<Lock size={16} />}
  validateOn="blur"
  validate={(val) => {
    if (val.length < 8) return "Must be at least 8 characters.";
    if (!/[A-Z]/.test(val)) return "Must contain an uppercase letter.";
    if (!/[0-9]/.test(val)) return "Must contain a number.";
    return true;
  }}
  successMessage="Strong password!"
/>`}>
              <CustomTextField
                type="password"
                label="Password"
                placeholder="At least 8 characters"
                leadingIcon={<Lock size={16} />}
                helperText="Use uppercase, lowercase, and a number."
                minLength={8}
                validateOn="blur"
                validate={(val) => {
                  if (val.length < 8) return "Must be at least 8 characters.";
                  if (!/[A-Z]/.test(val)) return "Must contain an uppercase letter.";
                  if (!/[0-9]/.test(val)) return "Must contain a number.";
                  return true;
                }}
                successMessage="Strong password!"
                value={password}
                onChange={(val) => setPassword(val)}
              />
            </Section>
            
            <Separator className="bg-slate-100" />
            
            <Section title="Filled Search Variant" code={`<CustomTextField
  type="search"
  placeholder="Search anything..."
  leadingIcon={<Search size={16} />}
  variant="filled"
  clearable
  size="md"
  borderRadius={24}
  colors={{ focus: "#BA7517" }}
/>`}>
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
                onChange={(val) => setSearch(val)}
                colors={{ focus: "#BA7517" }}
              />
            </Section>
            
            <Separator className="bg-slate-100" />
            
            <Section title="Other States" code={`<CustomTextField
  type="text"
  label="Account ID"
  value="ACC-2024-88f3a"
  readOnly
/>

<CustomTextField
  type="text"
  label="Referral code"
  value="PROMO2025"
  disabled
/>

<CustomTextField
  type="text"
  label="Nickname"
  variant="underline"
  optional
  size="lg"
/>`}>
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
