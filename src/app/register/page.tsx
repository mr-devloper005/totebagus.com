import Link from 'next/link'
import { Camera, Sparkles, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

const tote = {
  panel: 'border border-[#dfe8e4] bg-white shadow-[0_22px_56px_rgba(45,90,76,0.08)]',
  side: 'border border-[#dfe8e4] bg-[#f8faf9]',
  muted: 'text-[#4a635c]',
  action: 'bg-[#2d5a4c] text-white shadow-[0_14px_32px_rgba(45,90,76,0.22)] hover:bg-[#23463c]',
  input: 'border border-[#dfe8e4] bg-white text-[#1a2e28] placeholder:text-[#7a9088]',
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  return (
    <div className="tote-page-frame">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${tote.side}`}>
            <div className="flex gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2d5a4c] text-white">
                <Tag className="h-5 w-5" />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#dfe8e4] bg-white text-[#2d5a4c]">
                <Camera className="h-5 w-5" />
              </div>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#1a2e28]">Create your tote account</h1>
            <p className={`mt-5 text-sm leading-relaxed ${tote.muted}`}>
              Post classifieds with clear photos, upload gallery shots, and keep everything in one calm workspace that matches the homepage look.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                'Forest-on-mist palette across every surface',
                'Rounded cards and soft shadows like the home hero',
                'Built for deals + visual stories together',
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-[#dfe8e4] bg-white px-4 py-4 text-sm text-[#2d4a42] shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${tote.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5a6f68]">Create account</p>
            <form className="mt-6 grid gap-4">
              <input className={`h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-[#2d5a4c]/30 ${tote.input}`} placeholder="Full name" />
              <input className={`h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-[#2d5a4c]/30 ${tote.input}`} placeholder="Email address" type="email" />
              <input className={`h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-[#2d5a4c]/30 ${tote.input}`} placeholder="Password" type="password" />
              <input className={`h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-[#2d5a4c]/30 ${tote.input}`} placeholder="What will you post first — a deal or a photo?" />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${tote.action}`}>
                Create account
              </button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${tote.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#2d5a4c] hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
