'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="tote-page-frame">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#dfe8e4] bg-[linear-gradient(165deg,#f5f7f9_0%,#eef5f2_50%,#e8f0ec_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(45,90,76,0.08),transparent_40%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-[#1a2e28] sm:text-4xl">{title}</h1>
                {description && (
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4a635c]">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3 [&_a]:rounded-full [&_button]:rounded-full">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
