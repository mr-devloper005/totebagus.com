import Link from 'next/link'
import type { Metadata } from 'next'
import { Activity, Cloud, Image as ImageIcon, Server } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/status',
    title: `Status | ${SITE_CONFIG.name}`,
    description: 'Live health for the marketplace web app, media CDN, and search surfaces.',
  })
}

const services = [
  { name: 'Web app', detail: 'Classifieds + images shell', status: 'Operational', icon: Server },
  { name: 'Media CDN', detail: 'Resized gallery delivery', status: 'Operational', icon: ImageIcon },
  { name: 'Search', detail: 'Site-wide query + filters', status: 'Operational', icon: Activity },
  { name: 'Edge cache', detail: 'Global HTML + data', status: 'Degraded', icon: Cloud },
]

const incidents = [
  { date: 'Apr 8, 2026', title: 'Image CDN reroute in APAC', status: 'Resolved' },
  { date: 'Mar 12, 2026', title: 'Delayed notifications', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="Forest-on-mist styling matches the rest of the site—quick read on what powers listings and galleries."
      actions={
        <Link
          href="/developers"
          className="inline-flex items-center justify-center rounded-full border border-[#dfe8e4] bg-white px-5 py-2.5 text-sm font-semibold text-[#2d4a42] shadow-sm transition-colors hover:border-[#2d5a4c]/30"
        >
          Developer notes
        </Link>
      }
    >
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.name} className="border-[#dfe8e4] bg-white shadow-[0_12px_32px_rgba(45,90,76,0.06)]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#1a2e28]">{service.name}</p>
                    <p className="mt-1 text-xs text-[#5a6f68]">{service.detail}</p>
                  </div>
                  <service.icon className="h-5 w-5 shrink-0 text-[#2d5a4c]/80" />
                </div>
                <Badge
                  className={`mt-4 rounded-full px-3 py-1 text-[11px] font-semibold ${
                    service.status === 'Operational' ? 'bg-[#eef5f2] text-[#2d5a4c]' : 'bg-[#fff4e4] text-[#8a5a16]'
                  }`}
                  variant="secondary"
                >
                  {service.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-[#dfe8e4] bg-[linear-gradient(180deg,#ffffff,#f6faf8)]">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1a2e28]">Incident history</h3>
                <p className="mt-1 text-sm text-[#4a635c]">Transparent notes when gallery or listing flows wobble.</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5a6f68] shadow-sm">Last 90 days</span>
            </div>
            <div className="mt-6 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-xl border border-[#dfe8e4] bg-white px-4 py-3 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#5a6f68]">{incident.date}</div>
                  <div className="mt-1 text-sm font-medium text-[#1a2e28]">{incident.title}</div>
                  <div className="mt-1 text-xs text-[#2d5a4c]">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
