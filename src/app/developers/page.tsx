import Link from 'next/link'
import type { Metadata } from 'next'
import { BookOpen, Code2, Gauge, KeyRound, Webhook } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/developers',
    title: `Developers | ${SITE_CONFIG.name}`,
    description: `Embeds, feeds, and integration notes for teams wiring ${SITE_CONFIG.name} into their own surfaces.`,
  })
}

const tiles = [
  {
    title: 'Read-only feeds',
    body: 'JSON snapshots for classifieds and image posts—ideal for partner widgets without write access.',
    icon: BookOpen,
  },
  {
    title: 'Webhooks (beta)',
    body: 'Subscribe to publish, unpublish, and price-change signals with HMAC-signed payloads.',
    icon: Webhook,
  },
  {
    title: 'Performance budgets',
    body: 'We target crisp LCP on gallery grids and keep CLS low on card stacks—mirror the same in your embeds.',
    icon: Gauge,
  },
  {
    title: 'API keys & sandboxes',
    body: 'Scoped keys for staging vs production, rotated quarterly. Pair with your own CDN for heavy media.',
    icon: KeyRound,
  },
]

export default function DevelopersPage() {
  return (
    <PageShell
      title="Developers"
      description="Lightweight docs for partners who want listings and gallery content to feel native inside their own apps."
      actions={
        <Button asChild variant="outline" className="rounded-full border-[#dfe8e4] bg-white">
          <Link href="/status">Check status</Link>
        </Button>
      }
    >
      <div className="space-y-8">
        <div className="rounded-[1.5rem] border border-[#dfe8e4] bg-white p-6 shadow-[0_14px_36px_rgba(45,90,76,0.06)]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2d5a4c] text-white">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5a6f68]">Integration kit</p>
              <p className="text-lg font-semibold text-[#1a2e28]">Compose with the same tokens as the product UI</p>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#4a635c]">
            Forest `#2D5A4C`, mist backgrounds, and 16–24px radii are the defaults. If you match those, embedded cards feel like they belong beside the native homepage—not like a bolted-on iframe.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {tiles.map((tile) => (
            <Card key={tile.title} className="border-[#dfe8e4] bg-[#fafcfb] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(45,90,76,0.08)]">
              <CardContent className="p-6">
                <tile.icon className="h-5 w-5 text-[#2d5a4c]" />
                <h2 className="mt-4 text-lg font-semibold text-[#1a2e28]">{tile.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4a635c]">{tile.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-[#dfe8e4] bg-white">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#1a2e28]">Need a deeper integration?</h3>
              <p className="mt-1 text-sm text-[#4a635c]">Tell us about traffic, SLA, and moderation needs—we respond within two business days.</p>
            </div>
            <Button asChild className="rounded-full bg-[#2d5a4c] text-white hover:bg-[#23463c]">
              <Link href="/contact">Talk to us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
