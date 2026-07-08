'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/logo'
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  Search,
  Copy,
  ListChecks,
  LineChart,
  Users,
  Building2,
  ClipboardList,
  Lock,
  Menu,
  X,
  Check,
} from 'lucide-react'

const copilotFeatures = [
  {
    icon: FileText,
    title: 'Case summaries',
    description: 'Distills a complex case into a clear, readable summary in seconds.',
  },
  {
    icon: Search,
    title: 'Missing-info detection',
    description: 'Identifies gaps in a record so nothing important falls through.',
  },
  {
    icon: Copy,
    title: 'Duplicate detection',
    description: 'Flags potential duplicate records to keep your data clean.',
  },
  {
    icon: ListChecks,
    title: 'Follow-up recommendations',
    description: 'Suggests the next best action so teams always know what comes next.',
  },
  {
    icon: LineChart,
    title: 'Operational insights',
    description: 'Surfaces patterns across the workspace before they become problems.',
  },
  {
    icon: ShieldCheck,
    title: 'You stay in control',
    description: 'Every suggestion is reviewable. AI assists judgment — it never replaces it.',
  },
]

const pillars = [
  {
    icon: ClipboardList,
    title: 'One unified workspace',
    description:
      'Case management, CRM, tasks, reporting, and secure records share a single coherent system — breadth that reads as capability, not clutter.',
  },
  {
    icon: Lock,
    title: 'Privacy-first by architecture',
    description:
      'A role-based permission model is woven into the structure of the product. Access control is structural, not bolted on after the fact.',
  },
  {
    icon: Sparkles,
    title: 'An AI copilot that assists',
    description:
      'The Operations Copilot removes administrative drag and recommends the next best action — while your team keeps firm control over every sensitive decision.',
  },
]

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-svh overflow-x-hidden" style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }}>
      {/* ===== Navigation ===== */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: '#1E293B', backgroundColor: 'rgba(15,23,42,0.72)' }}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo variant="full" size="md" href="/" />

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#platform" className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
              Platform
            </a>
            <a href="#copilot" className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
              AI Copilot
            </a>
            <a href="#security" className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
              Security
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/sign-in"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/5"
              style={{ color: '#FFFFFF' }}
            >
              Sign In
            </Link>
            <Link
              href="/demo"
              className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: '#06B6D4', color: '#0F172A', boxShadow: '0 8px 24px -8px rgba(6,182,212,0.6)' }}
            >
              Try Demo Workspace
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
            style={{ color: '#94A3B8' }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t px-6 py-4 md:hidden" style={{ borderColor: '#1E293B', backgroundColor: '#0F172A' }}>
            <div className="flex flex-col gap-4">
              <a href="#platform" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#94A3B8' }}>
                Platform
              </a>
              <a href="#copilot" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#94A3B8' }}>
                AI Copilot
              </a>
              <a href="#security" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#94A3B8' }}>
                Security
              </a>
              <div className="mt-2 flex flex-col gap-3">
                <Link
                  href="/sign-in"
                  className="rounded-lg border px-4 py-2.5 text-center text-sm font-semibold"
                  style={{ borderColor: '#334155', color: '#FFFFFF' }}
                >
                  Sign In
                </Link>
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
                  style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
                >
                  Try Demo Workspace
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ===== Hero ===== */}
      <section className="relative">
        {/* Ambient glows */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(60% 50% at 20% 0%, rgba(6,182,212,0.16), transparent 60%), radial-gradient(50% 50% at 85% 20%, rgba(16,185,129,0.12), transparent 60%)',
          }}
        />
        <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
          {/* Left copy */}
          <div>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
              style={{ borderColor: '#334155', backgroundColor: '#1E293B', color: '#06B6D4' }}
            >
              <Sparkles size={13} />
              AI-powered operations platform
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              One calm workspace for{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #06B6D4, #10B981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                high-stakes work
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
              HelixOS unifies case management, CRM, tasks, reporting, and secure records into a single
              privacy-first platform — with an AI copilot that surfaces the next best action, so your team
              spends time on the cases, not the admin.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="group flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold shadow-lg transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: '#06B6D4', color: '#0F172A', boxShadow: '0 12px 32px -10px rgba(6,182,212,0.7)' }}
              >
                Try Demo Workspace
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-base font-semibold transition-colors hover:bg-white/5"
                style={{ borderColor: '#334155', color: '#FFFFFF' }}
              >
                Sign In
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: '#94A3B8' }}>
              <span className="flex items-center gap-2">
                <Check size={16} style={{ color: '#10B981' }} /> No setup required
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} style={{ color: '#10B981' }} /> Realistic demo data
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} style={{ color: '#10B981' }} /> Privacy-first
              </span>
            </div>
          </div>

          {/* Right: product preview mockup */}
          <div className="relative">
            <div
              className="absolute -inset-4 -z-10 rounded-3xl opacity-60 blur-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(16,185,129,0.18))' }}
            />
            <div
              className="rounded-2xl border p-5 shadow-2xl"
              style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}
            >
              {/* mock window bar */}
              <div className="mb-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#EF4444' }} />
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#10B981' }} />
                <span className="ml-3 text-xs" style={{ color: '#64748B' }}>
                  helixos · workspace
                </span>
              </div>

              {/* mock KPI row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Active Cases', value: '128', icon: ClipboardList, color: '#06B6D4' },
                  { label: 'Members', value: '3.4k', icon: Users, color: '#10B981' },
                  { label: 'Providers', value: '212', icon: Building2, color: '#8B5CF6' },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl border p-3" style={{ borderColor: '#334155', backgroundColor: '#0F172A' }}>
                    <k.icon size={16} style={{ color: k.color }} />
                    <p className="mt-2 text-xl font-bold" style={{ color: '#FFFFFF' }}>
                      {k.value}
                    </p>
                    <p className="text-[11px]" style={{ color: '#94A3B8' }}>
                      {k.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* mock copilot card */}
              <div
                className="mt-4 rounded-xl border p-4"
                style={{
                  borderColor: 'rgba(6,182,212,0.35)',
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.10), rgba(16,185,129,0.06))',
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles size={15} style={{ color: '#06B6D4' }} />
                  <span className="text-xs font-semibold" style={{ color: '#06B6D4' }}>
                    Operations Copilot
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#E2E8F0' }}>
                  Case #4821 is missing an intake follow-up. Recommended next action:{' '}
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>schedule outreach within 48 hours.</span>
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-md px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}>
                    Review suggestion
                  </span>
                  <span className="rounded-md border px-2.5 py-1 text-[11px] font-medium" style={{ borderColor: '#334155', color: '#94A3B8' }}>
                    Dismiss
                  </span>
                </div>
              </div>

              {/* mock task rows */}
              <div className="mt-4 space-y-2">
                {[
                  { t: 'Verify provider credentials', c: '#F59E0B' },
                  { t: 'Merge duplicate member records', c: '#10B981' },
                ].map((row) => (
                  <div key={row.t} className="flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: '#334155', backgroundColor: '#0F172A' }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.c }} />
                    <span className="text-xs" style={{ color: '#E2E8F0' }}>
                      {row.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Pillars ===== */}
      <section id="platform" className="border-t" style={{ borderColor: '#1E293B' }}>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Power and privacy, in one workspace</h2>
            <p className="mt-4 text-lg" style={{ color: '#94A3B8' }}>
              An operations platform for sensitive work has to reconcile two things that usually pull against each
              other. HelixOS is built to hold both.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border p-7 transition-colors hover:border-[#06B6D4]/50"
                style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: 'rgba(6,182,212,0.12)' }}
                >
                  <p.icon size={22} style={{ color: '#06B6D4' }} />
                </div>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed" style={{ color: '#94A3B8' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI Copilot ===== */}
      <section id="copilot" className="relative border-t" style={{ borderColor: '#1E293B' }}>
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(50% 60% at 50% 0%, rgba(16,185,129,0.10), transparent 60%)' }}
        />
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
              style={{ borderColor: '#334155', backgroundColor: '#1E293B', color: '#10B981' }}
            >
              <Sparkles size={13} />
              The AI Operations Copilot
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Takes the administrative weight off your team
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#94A3B8' }}>
              The copilot reduces manual work and recommends the next best action — enabling faster, more informed
              decisions while your team keeps firm control over sensitive data.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copilotFeatures.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border p-6 transition-transform hover:-translate-y-1"
                style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(16,185,129,0.12))' }}
                >
                  <f.icon size={20} style={{ color: '#06B6D4' }} />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Security ===== */}
      <section id="security" className="border-t" style={{ borderColor: '#1E293B' }}>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
                style={{ borderColor: '#334155', backgroundColor: '#1E293B', color: '#06B6D4' }}
              >
                <ShieldCheck size={13} />
                Privacy-first architecture
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Access control that's structural, not an afterthought
              </h2>
              <p className="mt-4 text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
                Sensitive data demands strong permissions woven into the structure of the product. In HelixOS, the
                information architecture and permission model were designed up front — what each role can see and do —
                before a single screen.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Role-based permissions at the core of every view',
                  'Secure record management for sensitive operational data',
                  'AI suggestions are attributed and always reviewable',
                  'Your team keeps firm control over every sensitive decision',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: 'rgba(16,185,129,0.15)' }}
                    >
                      <Check size={14} style={{ color: '#10B981' }} />
                    </span>
                    <span style={{ color: '#E2E8F0' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="relative rounded-2xl border p-8"
              style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}
            >
              <div
                className="absolute -inset-3 -z-10 rounded-3xl opacity-50 blur-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.15))' }}
              />
              <Lock size={40} style={{ color: '#10B981' }} />
              <p className="mt-6 text-2xl font-semibold leading-snug">
                &ldquo;It had to feel like one calm workspace — not five tools in a trench coat.&rdquo;
              </p>
              <p className="mt-4" style={{ color: '#94A3B8' }}>
                Case management, CRM, tasks, reporting, and records share a coherent system, so breadth reads as
                capability rather than clutter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="border-t" style={{ borderColor: '#1E293B' }}>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div
            className="relative overflow-hidden rounded-3xl border px-8 py-16 text-center"
            style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(50% 80% at 50% 0%, rgba(6,182,212,0.18), transparent 65%), radial-gradient(40% 60% at 80% 100%, rgba(16,185,129,0.14), transparent 60%)',
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                See HelixOS in action
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: '#94A3B8' }}>
                Explore a fully populated demo workspace — no account required — or sign in to your team&apos;s
                platform.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/demo"
                  className="group flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold shadow-lg transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: '#06B6D4', color: '#0F172A', boxShadow: '0 12px 32px -10px rgba(6,182,212,0.7)' }}
                >
                  Try Demo Workspace
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/sign-in"
                  className="flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-base font-semibold transition-colors hover:bg-white/5"
                  style={{ borderColor: '#475569', color: '#FFFFFF' }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t" style={{ borderColor: '#1E293B' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Logo variant="full" size="sm" href="/" />
          <p className="text-sm" style={{ color: '#64748B' }}>
            © {new Date().getFullYear()} HelixOS · An AI-powered, privacy-first operations platform
          </p>
          <div className="flex items-center gap-6 text-sm" style={{ color: '#94A3B8' }}>
            <Link href="/sign-in" className="transition-colors hover:text-white">
              Sign In
            </Link>
            <Link href="/demo" className="transition-colors hover:text-white">
              Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
