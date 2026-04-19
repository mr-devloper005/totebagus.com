import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CalendarHeart, HeartHandshake, Images, Sparkles, Users } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/community',
    title: `Community | ${SITE_CONFIG.name}`,
    description: 'Meet the people shaping listings and galleries—events, spotlights, and ways to contribute.',
  })
}

const pillars = [
  {
    title: 'Show & tell Fridays',
    body: 'Share haul photos, behind-the-scenes snaps, and the story behind each listing.',
    icon: Images,
  },
  {
    title: 'Seller office hours',
    body: 'Ask pricing questions live, compare shipping ideas, and learn how others write titles.',
    icon: Users,
  },
  {
    title: 'Neighborhood swaps',
    body: 'Micro meetups for trading gear locally—paired with map-friendly classifieds.',
    icon: HeartHandshake,
  },
]

export default function CommunityPage() {
  return (
    <PageShell
      title="Community"
      description="A softer social layer for people who live in both the classifieds lane and the gallery lane—without the noise of a giant feed."
      actions={
        <Button asChild className="rounded-full bg-[#2d5a4c] px-6 text-white shadow-[0_12px_28px_rgba(45,90,76,0.2)] hover:bg-[#23463c]">
          <Link href="/login">Join the hub</Link>
        </Button>
      }
    >
      <div className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="border-[#dfe8e4] bg-white shadow-[0_14px_36px_rgba(45,90,76,0.06)]">
              <CardContent className="p-6">
                <p.icon className="h-6 w-6 text-[#2d5a4c]" />
                <h2 className="mt-4 text-xl font-semibold text-[#1a2e28]">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4a635c]">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 rounded-[1.75rem] border border-[#dfe8e4] bg-[linear-gradient(120deg,#ffffff,#f3faf6)] p-8 shadow-inner lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfe8e4] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5a6f68]">
              <CalendarHeart className="h-3.5 w-3.5 text-[#c44545]" />
              Upcoming
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#1a2e28]">Spotlight stage + critique night</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a635c]">
              Bring three photos or one listing draft. We rotate quick feedback so everyone leaves with a sharper post.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full border-[#dfe8e4] bg-white">
                <Link href="/images">Share a gallery</Link>
              </Button>
              <Button asChild className="rounded-full bg-[#2d5a4c] text-white hover:bg-[#23463c]">
                <Link href="/classifieds" className="inline-flex items-center gap-2">
                  Post a deal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-[#dfe8e4] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5a6f68]">Community pulse</p>
            <div className="mt-4 space-y-4">
              {[
                { label: 'Weekly photo prompts answered', value: 86, tone: 'bg-[#2d5a4c]' },
                { label: 'Listings marked sold after tips', value: 64, tone: 'bg-[#7aa89a]' },
                { label: 'Safety reports resolved < 24h', value: 92, tone: 'bg-[#c44545]/80' },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#4a635c]">
                    <span>{row.label}</span>
                    <span>{row.value}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#eef3f1]">
                    <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${row.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-[#5a6f68]">
              <Sparkles className="h-3.5 w-3.5 text-[#2d5a4c]" />
              Aspirational metrics to mirror the wellness-dashboard inspiration—numbers reset each season.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
