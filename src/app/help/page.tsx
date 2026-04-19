import Link from 'next/link'
import type { Metadata } from 'next'
import { Camera, LifeBuoy, MessageCircle, Shield, Tag } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/help',
    title: `Help Center | ${SITE_CONFIG.name}`,
    description: `Guides for classifieds, image posts, safety, and account basics on ${SITE_CONFIG.name}.`,
  })
}

const topics = [
  {
    title: 'Classifieds & deals',
    description: 'Write titles buyers skim in seconds, add sharp photos, and set expectations before you chat.',
    icon: Tag,
  },
  {
    title: 'Image posts & albums',
    description: 'Crop-friendly uploads, cover picks, and gentle compression so galleries stay fast on mobile.',
    icon: Camera,
  },
  {
    title: 'Trust & safety',
    description: 'Spot common scams, keep payments off-platform when unsure, and report listings in two taps.',
    icon: Shield,
  },
  {
    title: 'Community norms',
    description: 'Keep feedback constructive, credit originals, and use tags so search stays clean for everyone.',
    icon: MessageCircle,
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Practical answers for posting deals, sharing photos, and staying safe while you browse."
      actions={
        <Button asChild className="rounded-full bg-[#2d5a4c] px-6 text-white shadow-[0_12px_28px_rgba(45,90,76,0.2)] hover:bg-[#23463c]">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-[#dfe8e4] bg-[linear-gradient(120deg,#ffffff,#f4faf7)] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2d5a4c] text-white">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6f68]">Start here</p>
                <p className="text-lg font-semibold text-[#1a2e28]">Hey, need help?</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#4a635c]">
              Jump into the topics on the right or skim the FAQ. Everything here matches the forest + mist palette from the homepage so your eyes get a consistent break.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full border-[#dfe8e4] bg-white">
                <Link href="/classifieds">Browse classifieds</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[#dfe8e4] bg-white">
                <Link href="/images">Open images</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <Card
                key={topic.title}
                className="border-[#dfe8e4] bg-white shadow-[0_14px_36px_rgba(45,90,76,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(45,90,76,0.1)]"
              >
                <CardContent className="p-6">
                  <topic.icon className="h-5 w-5 text-[#2d5a4c]" />
                  <h2 className="mt-4 text-lg font-semibold text-[#1a2e28]">{topic.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a635c]">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-[#dfe8e4] bg-white shadow-[0_18px_44px_rgba(45,90,76,0.07)]">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1a2e28]">FAQ</h3>
            <p className="mt-1 text-sm text-[#4a635c]">Short answers, expandable details.</p>
            <Accordion type="single" collapsible className="mt-5">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#dfe8e4]">
                  <AccordionTrigger className="text-left text-[#1a2e28] hover:text-[#2d5a4c]">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#4a635c]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
