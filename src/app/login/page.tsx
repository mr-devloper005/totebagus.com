import Link from 'next/link'
import { Camera, MapPin, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LoginForm } from '@/components/auth/login-form'

const toteLogin = {
  panel: 'border border-[#dfe8e4] bg-white shadow-[0_22px_56px_rgba(45,90,76,0.08)]',
  side: 'border border-[#dfe8e4] bg-[#f8faf9]',
  muted: 'text-[#4a635c]',
  action: 'bg-[#2d5a4c] text-white shadow-[0_14px_32px_rgba(45,90,76,0.22)] hover:bg-[#23463c]',
  input: 'border border-[#dfe8e4] bg-white text-[#1a2e28] placeholder:text-[#7a9088]',
}

export default function LoginPage() {
  return (
    <div className="tote-page-frame">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${toteLogin.side}`}>
            <div className="flex gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2d5a4c] text-white">
                <Tag className="h-5 w-5" />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#dfe8e4] bg-white text-[#2d5a4c]">
                <Camera className="h-5 w-5" />
              </div>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">Welcome back to your tote workspace</h1>
            <p className={`mt-5 text-sm leading-relaxed ${toteLogin.muted}`}>
              Post a classified, upload a gallery shot, and pick up where you left off. Your session stays on this device after you sign in.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { title: 'List faster', body: 'Templates tuned for price, location, and photos.', icon: MapPin },
                { title: 'Gallery continuity', body: 'Keep uploads and drafts aligned with your profile.', icon: Camera },
                { title: 'Safer handoffs', body: 'Clearer cues before you message a seller.', icon: Tag },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.35rem] border border-[#dfe8e4] bg-white px-4 py-4 text-sm shadow-sm">
                  <div className="flex items-center gap-2 font-semibold text-[#1a2e28]">
                    <item.icon className="h-4 w-4 text-[#2d5a4c]" />
                    {item.title}
                  </div>
                  <p className={`mt-1 text-sm leading-relaxed ${toteLogin.muted}`}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${toteLogin.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5a6f68]">Account access</p>
            <p className="mt-2 text-lg font-semibold text-[#1a2e28]">Sign in</p>
            <LoginForm actionClass={toteLogin.action} mutedClass={toteLogin.muted} inputClass={toteLogin.input} />
            <p className={`mt-6 text-center text-xs ${toteLogin.muted}`}>
              By continuing you agree to our{' '}
              <Link href="/terms" className="font-semibold text-[#2d5a4c] hover:underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-semibold text-[#2d5a4c] hover:underline">
                Privacy
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
