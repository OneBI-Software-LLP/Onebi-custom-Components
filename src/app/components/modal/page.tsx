"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CustomModal } from "@/components/CustomModal";

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-10 border-t border-slate-100 pt-8">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        Installation & Usage
      </Label>
      <Badge
        variant="outline"
        className="text-[10px] bg-slate-50 text-slate-500 font-mono tracking-widest border-slate-200"
      >
        import className CustomModal
      </Badge>
    </div>
    <pre className="p-5 rounded-2xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[13px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

function LegacyModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CustomModal.Button variant="secondary" onClick={() => setOpen(true)}>Open Legacy Modal</CustomModal.Button>
      <CustomModal isOpen={open} onClose={() => setOpen(false)} title="Legacy Wrapper">
        <p>This modal is rendered using the legacy <code>isOpen</code> and <code>title</code> props to show backward compatibility without modifying existing imports.</p>
      </CustomModal>
    </>
  );
}

function BasicModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CustomModal.Button variant="primary" onClick={() => setOpen(true)}>Basic Confirm</CustomModal.Button>
      <CustomModal open={open} onClose={() => setOpen(false)} size="sm">
        <CustomModal.Header title="Confirm action" subtitle="Are you sure you want to proceed?" />
        <CustomModal.Body>
          <p>This action will save your current progress and notify your team.</p>
        </CustomModal.Body>
        <CustomModal.Footer>
          <CustomModal.Button variant="ghost" onClick={() => setOpen(false)}>Cancel</CustomModal.Button>
          <CustomModal.Button variant="primary" onClick={() => setOpen(false)}>Confirm</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function AlertModalDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setOpen(false); }, 1800);
  };

  return (
    <>
      <CustomModal.Button variant="danger" onClick={() => setOpen(true)}>Delete Project</CustomModal.Button>
      <CustomModal open={open} onClose={() => setOpen(false)} size="sm" animation="scale">
        <CustomModal.Header
          title="Delete workspace"
          subtitle="This action is permanent and cannot be undone."
          icon="⚠"
          iconVariant="danger"
        />
        <CustomModal.Body>
          <p>All projects, files, and team members will be permanently removed.</p>
        </CustomModal.Body>
        <CustomModal.Footer align="between">
          <CustomModal.Button variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
            Keep workspace
          </CustomModal.Button>
          <CustomModal.Button variant="danger" loading={loading} onClick={handleDelete}>
            Delete permanently
          </CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function DrawerModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CustomModal.Button variant="secondary" onClick={() => setOpen(true)}>Open Right Drawer</CustomModal.Button>
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        position="right"
        size="sm"
        animation="slide-right"
        closeOnOverlay
      >
        <CustomModal.Header title="Filters" subtitle="Refine your search results" divider />
        <CustomModal.Body scrollable>
          {['Category', 'Status', 'Date range'].map(f => (
            <div key={f} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, color: 'var(--modal-title-color,#111)' }}>{f}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['All', 'Option A', 'Option B'].map(o => (
                  <button key={o} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, border: '0.5px solid rgba(0,0,0,0.12)', background: o === 'All' ? '#378ADD' : 'transparent', color: o === 'All' ? '#fff' : 'rgba(0,0,0,0.5)', cursor: 'pointer' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </CustomModal.Body>
        <CustomModal.Footer align="between">
          <CustomModal.Button variant="ghost">Reset all</CustomModal.Button>
          <CustomModal.Button variant="primary" onClick={() => setOpen(false)}>Apply filters</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function BottomSheetModalDemo() {
  const [open, setOpen] = useState(false);
  const actions = [
    { icon: '✏', label: 'Edit', desc: 'Modify this item' },
    { icon: '⎘', label: 'Duplicate', desc: 'Create a copy' },
    { icon: '⬆', label: 'Export', desc: 'Download as CSV or PDF' },
  ];

  return (
    <>
      <CustomModal.Button variant="secondary" onClick={() => setOpen(true)}>Open Bottom Sheet</CustomModal.Button>
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        position="bottom"
        animation="slide-up"
        size="full"
        radius="xl"
        closeOnOverlay
      >
        <CustomModal.Header title="Actions" divider />
        <CustomModal.Body padding="8px 8px">
          {actions.map(a => (
            <button key={a.label} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '12px 16px', border: 'none', borderRadius: 10, background: 'transparent', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontSize: 20, width: 38, height: 38, borderRadius: 8, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{a.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 1 }}>{a.desc}</div>
              </div>
            </button>
          ))}
        </CustomModal.Body>
        <CustomModal.Footer align="center" divider={false}>
          <CustomModal.Button variant="secondary" fullWidth onClick={() => setOpen(false)}>Cancel</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function StepperModalDemo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ['Details', 'Configure', 'Review'];
  const close = () => { setOpen(false); setTimeout(() => setStep(0), 300); };

  return (
    <>
      <CustomModal.Button variant="secondary" onClick={() => setOpen(true)}>Multi-Step Wizard</CustomModal.Button>
      <CustomModal open={open} onClose={close} size="md" animation="scale">
        <CustomModal.Header title="New project" subtitle={`Step ${step + 1} of ${steps.length}`} divider={false} />
        <div style={{ padding: '4px 24px 0' }}>
          <CustomModal.Stepper steps={steps} current={step} />
        </div>
        <hr style={{ border: 'none', borderTop: '0.5px solid rgba(0,0,0,0.10)', margin: 0 }} />
        <CustomModal.Body>
          <div style={{ minHeight: "100px" }}>
             <p>Currently on step {step + 1}. You can customize this content heavily.</p>
          </div>
        </CustomModal.Body>
        <CustomModal.Footer align="between">
          <CustomModal.Button variant="ghost" onClick={step === 0 ? close : () => setStep(s => s - 1)}>
            {step === 0 ? 'Cancel' : '← Back'}
          </CustomModal.Button>
          <CustomModal.Button variant="primary" onClick={step === steps.length - 1 ? close : () => setStep(s => s + 1)}>
            {step === steps.length - 1 ? 'Finish' : 'Continue →'}
          </CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function SuccessModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CustomModal.Button variant="success" onClick={() => setOpen(true)}>Payment Success</CustomModal.Button>
      <CustomModal open={open} onClose={() => setOpen(false)} size="xs" animation="scale" closeOnOverlay>
        <CustomModal.Body padding="32px 24px">
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#EAF3DE', color: '#3B6D11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>✓</div>
            <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>Payment successful</div>
            <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
              A receipt has been sent to your email.
            </div>
          </div>
        </CustomModal.Body>
        <CustomModal.Footer align="center" divider={false} padding="0 24px 24px">
          <CustomModal.Button variant="primary" fullWidth onClick={() => setOpen(false)}>Done</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function FormModalDemo() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'member' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    setTimeout(() => { setSaving(false); setOpen(false); setForm({ name: '', email: '', role: 'member' }); setErrors({}); }, 1500);
  };

  const field = (label: string, key: 'name' | 'email' | 'role', type = 'text', opts: { placeholder?: string, select?: boolean } = {}) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 5, color: 'var(--modal-title-color, #111)' }}>
        {label}
      </label>
      {opts.select ? (
        <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 8, border: `0.5px solid ${errors[key] ? '#E24B4A' : 'rgba(0,0,0,0.15)'}`, outline: 'none', background: 'var(--modal-bg, #fff)', color: 'var(--modal-title-color, #111)' }}>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
          <option value="viewer">Viewer</option>
        </select>
      ) : (
        <input type={type} value={form[key]} placeholder={opts.placeholder}
          onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
          style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 8, border: `0.5px solid ${errors[key] ? '#E24B4A' : 'rgba(0,0,0,0.15)'}`, outline: 'none', background: 'var(--modal-bg, #fff)', color: 'var(--modal-title-color, #111)', boxSizing: 'border-box' }} />
      )}
      {errors[key] && <div style={{ fontSize: 11, color: '#E24B4A', marginTop: 4 }}>{errors[key]}</div>}
    </div>
  );

  return (
    <>
      <CustomModal.Button variant="primary" onClick={() => setOpen(true)}>Invite Member Form</CustomModal.Button>
      <CustomModal open={open} onClose={() => setOpen(false)} size="md" animation="scale" blur>
        <CustomModal.Header
          title="Invite team member"
          subtitle="They'll receive an email to join your workspace."
          icon="✉"
          iconVariant="info"
        />
        <CustomModal.Body>
          {field('Full name', 'name', 'text', { placeholder: 'Jane Doe' })}
          {field('Email address', 'email', 'email', { placeholder: 'jane@company.com' })}
          {field('Role', 'role', 'text', { select: true })}
        </CustomModal.Body>
        <CustomModal.Footer align="end">
          <CustomModal.Button variant="ghost" onClick={() => setOpen(false)}>Cancel</CustomModal.Button>
          <CustomModal.Button variant="primary" loading={saving} onClick={handleSubmit}>
            Send invite
          </CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function ListScrollableModalDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <CustomModal.Button variant="secondary" onClick={() => setOpen(true)}>Scrollable List Modal</CustomModal.Button>
      <CustomModal open={open} onClose={() => setOpen(false)} size="sm" animation="slide-up">
        <CustomModal.Header title="Select an Option" subtitle="Scroll to see all options" divider />
        <CustomModal.Body scrollable maxHeight="50vh" padding="0">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <button key={i} onClick={() => setOpen(false)} style={{
                padding: '12px 24px', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)',
                background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: 14
              }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                Option Item {i + 1}
              </button>
            ))}
          </div>
        </CustomModal.Body>
        <CustomModal.Footer>
          <CustomModal.Button fullWidth variant="ghost" onClick={() => setOpen(false)}>Close</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function LightboxModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CustomModal.Button variant="secondary" onClick={() => setOpen(true)}>Image Preview</CustomModal.Button>
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        size="xl"
        animation="fade"
        overlayColor="rgba(0,0,0,0.85)"
        overlayOpacity={0.85}
        radius="lg"
        shadow="xl"
        closeOnOverlay
      >
        <CustomModal.Header showClose title="Preview" subtitle="project-screenshot.png" />
        <CustomModal.Body padding="0" scrollable={false}>
          <div style={{ width: '100%', height: 420, background: 'linear-gradient(135deg,#B5D4F4,#1D9E75)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, letterSpacing: '0.04em' }}>
            Image / media content
          </div>
        </CustomModal.Body>
        <CustomModal.Footer align="between">
          <CustomModal.Button variant="ghost">Download</CustomModal.Button>
          <CustomModal.Button variant="ghost">Share link</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function FullScreenModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CustomModal.Button variant="primary" onClick={() => setOpen(true)}>Full-Screen Editor</CustomModal.Button>
      <CustomModal open={open} onClose={() => setOpen(false)} fullScreen animation="fade">
        <CustomModal.Header title="Document editor" subtitle="Unsaved changes" divider />
        <CustomModal.Body>
          <textarea
            placeholder="Start writing..."
            style={{ width: '100%', minHeight: 400, resize: 'none', border: 'none', outline: 'none', fontSize: 15, lineHeight: 1.7, fontFamily: 'inherit', background: 'transparent', color: 'var(--modal-title-color,#111)' }}
          />
        </CustomModal.Body>
        <CustomModal.Footer align="between">
          <CustomModal.Button variant="ghost" onClick={() => setOpen(false)}>Discard</CustomModal.Button>
          <div style={{ display: 'flex', gap: 8 }}>
            <CustomModal.Button variant="secondary">Save draft</CustomModal.Button>
            <CustomModal.Button variant="primary" onClick={() => setOpen(false)}>Publish</CustomModal.Button>
          </div>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

function NestedModalDemo() {
  const [outer, setOuter] = useState(false);
  const [inner, setInner] = useState(false);

  return (
    <>
      <CustomModal.Button variant="secondary" onClick={() => setOuter(true)}>Open Nested Modal</CustomModal.Button>

      <CustomModal open={outer} onClose={() => setOuter(false)} size="md" zIndex={1000}>
        <CustomModal.Header title="Outer modal" subtitle="This is the first level" divider />
        <CustomModal.Body>
          <p>This is the outer modal body. You can open another modal on top.</p>
        </CustomModal.Body>
        <CustomModal.Footer align="between">
          <CustomModal.Button variant="ghost" onClick={() => setOuter(false)}>Close</CustomModal.Button>
          <CustomModal.Button variant="primary" onClick={() => setInner(true)}>Open inner modal</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>

      <CustomModal open={inner} onClose={() => setInner(false)} size="sm" zIndex={1100} animation="scale">
        <CustomModal.Header title="Inner modal" subtitle="Stacked on top of the outer" icon="✦" iconVariant="purple" />
        <CustomModal.Body><p>Use zIndex prop to stack modals correctly.</p></CustomModal.Body>
        <CustomModal.Footer>
          <CustomModal.Button variant="primary" onClick={() => setInner(false)}>Close inner</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}

export default function ModalPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Custom Modal
            </h2>
            <p className="text-lg text-slate-500">
              Highly configurable dialog component supporting legacy props, advanced animations, drawer positions, and sub-components.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Backward Compatibility
              </Label>
              <div className="flex flex-wrap gap-4">
                <LegacyModalDemo />
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Compound Components
              </Label>
              <div className="flex flex-wrap gap-4">
                <BasicModalDemo />
                <AlertModalDemo />
                <SuccessModalDemo />
                <FormModalDemo />
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Positions & Formats
              </Label>
              <div className="flex flex-wrap gap-4">
                <DrawerModalDemo />
                <BottomSheetModalDemo />
                <FullScreenModalDemo />
                <LightboxModalDemo />
              </div>
            </div>
            
            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Advanced Flows
              </Label>
              <div className="flex flex-wrap gap-4">
                <StepperModalDemo />
                <NestedModalDemo />
                <ListScrollableModalDemo />
              </div>
            </div>

            <CodeBlock
              code={`import { CustomModal } from "@/components/CustomModal";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <CustomModal.Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </CustomModal.Button>
      
      <CustomModal open={open} onClose={() => setOpen(false)} size="md" animation="scale">
        <CustomModal.Header 
          title="Modal Title" 
          subtitle="Description of what this modal does." 
          icon="👋" 
          iconVariant="purple" 
        />
        <CustomModal.Body>
          {/* Your form or content */}
        </CustomModal.Body>
        <CustomModal.Footer>
          <CustomModal.Button variant="ghost" onClick={() => setOpen(false)}>Cancel</CustomModal.Button>
          <CustomModal.Button variant="primary">Save Changes</CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

