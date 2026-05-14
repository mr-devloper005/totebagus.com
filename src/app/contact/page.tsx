import { Camera, Mail, MapPin, Phone, Sparkles, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

const tote = {
  panel: 'border border-[#dfe8e4] bg-white shadow-[0_22px_56px_rgba(45,90,76,0.08)]',
  soft: 'border border-[#dfe8e4] bg-[#f8faf9]',
  muted: 'text-[#4a635c]',
  action: 'bg-[#2d5a4c] text-white shadow-[0_14px_32px_rgba(45,90,76,0.22)] hover:bg-[#23463c]',
}

const lanes = [
  { icon: Tag, title: 'Classifieds & deals', body: 'Bulk uploads, pricing rules, and moderation for high-volume sellers.' },
  { icon: Camera, title: 'Gallery & media', body: 'Licensing, CDN limits, and creator programs for photo-heavy accounts.' },
  { icon: MapPin, title: 'Coverage & trust', body: 'Request new regions, verification flows, or safety partnerships.' },
  { icon: Phone, title: 'Phone support', body: 'Operational issues and account recovery with a human on the line.' },
  { icon: Mail, title: 'Press & partnerships', body: 'Collaborations that match the forest + mist brand system.' },
  { icon: Sparkles, title: 'Product feedback', body: 'Tell us what would make listing and browsing faster for your team.' },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="tote-page-frame">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5a6f68]">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#1a2e28] sm:text-5xl">We respond with the same calm UI you see everywhere else.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-relaxed ${tote.muted}`}>
              Pick the lane closest to your question. Every card below uses the same borders, radii, and forest accents as the homepage so the experience stays coherent.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.5rem] p-5 shadow-sm ${tote.soft}`}>
                  <lane.icon className="h-5 w-5 text-[#2d5a4c]" />
                  <h2 className="mt-3 text-lg font-semibold text-[#1a2e28]">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-relaxed ${tote.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tote.panel}`}>
            <h2 className="text-2xl font-semibold text-[#1a2e28]">Send a message</h2>
            <p className={`mt-2 text-sm ${tote.muted}`}>We typically reply within two business days.</p>
            <ContactLeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
