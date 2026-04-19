import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Camera,
  Clock,
  FileText,
  Grid3x3,
  Image as ImageIcon,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
  Zap,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'
import { cn } from '@/lib/utils'
import type { SitePost } from '@/lib/site-connector'

function heroImageUrl(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const url = media.find((m) => typeof m?.url === 'string' && m.url)?.url
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const imgs = Array.isArray(c.images) ? c.images.filter((u): u is string => typeof u === 'string') : []
  const logo = typeof c.logo === 'string' ? c.logo : null
  return url || imgs[0] || logo || '/placeholder.svg?height=640&width=960'
}

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#f5f7f9_0%,#eef5f2_55%,#ffffff_100%)] text-[#1a2e28]',
  'image-portfolio': 'bg-[linear-gradient(180deg,#f5f7f9_0%,#eef5f2_55%,#ffffff_100%)] text-[#1a2e28]',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#f2f6f4_0%,#fafcfc_45%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f2f6f4_0%,#fafcfc_45%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['profile-creator'].includes(layoutKey)
  const isToteSurface =
    layoutKey.startsWith('image') || layoutKey.startsWith('classified') || layoutKey.startsWith('listing') || layoutKey.startsWith('profile-business')
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#72594a]',
          panel: 'border border-[#dbc6b6] bg-white/90',
          soft: 'border border-[#dbc6b6] bg-[#fff8ef]',
          input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
          button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
        }
      : isToteSurface
        ? {
            muted: 'text-[#4a635c]',
            panel: 'border border-[#dfe8e4] bg-white shadow-[0_18px_44px_rgba(45,90,76,0.06)]',
            soft: 'border border-[#dfe8e4] bg-[#f8faf9]',
            input: 'border border-[#dfe8e4] bg-white text-[#1a2e28]',
            button: 'bg-[#2d5a4c] text-white hover:bg-[#23463c]',
          }
        : {
            muted: 'text-slate-600',
            panel: 'border border-slate-200 bg-white',
            soft: 'border border-slate-200 bg-slate-50',
            input: 'border border-slate-200 bg-white text-slate-950',
            button: 'bg-slate-950 text-white hover:bg-slate-800',
          }

  return (
    <div className={cn('tote-page-frame', shellClass)}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' || task === 'image' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-14 space-y-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#dfe8e4] bg-white p-8 shadow-[0_22px_56px_rgba(45,90,76,0.07)] sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(45,90,76,0.07),transparent_42%)]" />
              <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.soft}`}>
                    <Camera className="h-3.5 w-3.5" /> Visual gallery
                  </div>
                  <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#1a2e28] sm:text-5xl">{taskConfig?.description || 'Image gallery'}</h1>
                  <p className={`mt-5 max-w-xl text-base leading-relaxed ${ui.muted}`}>
                    Larger tiles, generous gutters, and forest accents so photos read like a mood board—not a cramped spreadsheet. Filter by topic or scroll straight into the wall.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-[#2d5a4c]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#eef5f2] px-3 py-1.5">
                      <Grid3x3 className="h-4 w-4" /> Masonry rhythm
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#eef5f2] px-3 py-1.5">
                      <Sparkles className="h-4 w-4" /> Sharp metadata
                    </span>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/create/image" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>
                      Upload photos
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/classifieds"
                      className="inline-flex items-center gap-2 rounded-full border border-[#dfe8e4] bg-white px-5 py-3 text-sm font-semibold text-[#1a2e28] hover:bg-[#f8faf9]"
                    >
                      See deals nearby
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {posts.length ? (
                    posts.slice(0, 4).map((post, i) => (
                      <div
                        key={post.id}
                        className={cn(
                          'relative overflow-hidden rounded-[1.5rem] border border-[#dfe8e4] bg-[#f0f4f2] shadow-sm',
                          i === 0 ? 'col-span-2 aspect-[2/1] min-h-[140px] sm:min-h-[180px]' : 'aspect-square min-h-[100px]',
                        )}
                      >
                        <ContentImage src={heroImageUrl(post)} alt={post.title} fill className="object-cover" />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className={cn('col-span-2 aspect-[2/1] min-h-[140px] rounded-[1.5rem] bg-[linear-gradient(120deg,#eef5f2,#ffffff)]', ui.panel)} />
                      <div className={cn('aspect-square min-h-[100px] rounded-[1.5rem]', ui.soft)} />
                      <div className={cn('aspect-square min-h-[100px] rounded-[1.5rem]', ui.soft)} />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={cn('space-y-4 rounded-[1.75rem] border border-[#dfe8e4] p-6', ui.soft)}>
              <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className={cn('text-xs font-semibold uppercase tracking-[0.22em]', ui.muted)}>Filter the wall</p>
                  <p className="mt-1 max-w-xl text-sm text-[#4a635c]">Categories keep mobile loads fast while desktop stays dense and browsable.</p>
                </div>
                <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center" action={taskConfig?.route || '#'}>
                  <label className="sr-only" htmlFor="gallery-category">
                    Category
                  </label>
                  <select
                    id="gallery-category"
                    name="category"
                    defaultValue={normalizedCategory}
                    className={cn('h-11 min-w-0 flex-1 rounded-xl px-3 text-sm', ui.input)}
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className={cn('h-11 shrink-0 rounded-xl px-6 text-sm font-semibold', ui.button)}>
                    Apply
                  </button>
                </form>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-[#dfe8e4]/80 pt-4">
                <Link
                  href={taskConfig?.route || '/images'}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                    normalizedCategory === 'all' ? 'bg-[#2d5a4c] text-white' : 'border border-[#dfe8e4] bg-white text-[#4a635c] hover:bg-[#eef5f2]',
                  )}
                >
                  All
                </Link>
                {CATEGORY_OPTIONS.slice(0, 12).map((opt) => (
                  <Link
                    key={opt.slug}
                    href={`${taskConfig?.route}?category=${opt.slug}`}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                      normalizedCategory === opt.slug ? 'bg-[#2d5a4c] text-white' : 'border border-[#dfe8e4] bg-white text-[#4a635c] hover:bg-[#eef5f2]',
                    )}
                  >
                    {opt.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-14 space-y-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#dfe8e4] bg-white p-8 shadow-[0_22px_56px_rgba(45,90,76,0.07)] sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(45,90,76,0.07)] blur-3xl" />
              <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.soft}`}>
                    <Tag className="h-3.5 w-3.5" /> Deals board
                  </div>
                  <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#1a2e28] sm:text-5xl">
                    Local classifieds with clear pricing, photos, and a fast path to message sellers.
                  </h1>
                  <p className={`mt-5 max-w-xl text-base leading-relaxed ${ui.muted}`}>
                    Skim titles, categories, and freshness in one pass. Cards mirror the home palette so hopping between the homepage and this board feels seamless.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="rounded-2xl border border-[#dfe8e4] bg-[#f8faf9] px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6f68]">Live posts</p>
                      <p className="mt-1 text-3xl font-semibold tabular-nums text-[#1a2e28]">{posts.length}</p>
                    </div>
                    <div className="rounded-2xl border border-[#dfe8e4] bg-[#f8faf9] px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6f68]">Topic lanes</p>
                      <p className="mt-1 text-3xl font-semibold tabular-nums text-[#1a2e28]">{CATEGORY_OPTIONS.length}</p>
                    </div>
                    <div className="rounded-2xl border border-[#dfe8e4] bg-[#f8faf9] px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6f68]">Cadence</p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#2d5a4c]">
                        <Clock className="h-4 w-4" />
                        Updated often
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/create/classified" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>
                      Post a deal
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/images"
                      className="inline-flex items-center gap-2 rounded-full border border-[#dfe8e4] bg-white px-5 py-3 text-sm font-semibold text-[#1a2e28] hover:bg-[#f8faf9]"
                    >
                      View gallery
                    </Link>
                  </div>
                </div>
                <div className={cn('space-y-5 rounded-[1.75rem] p-6', ui.soft)}>
                  <div>
                    <p className={cn('text-xs font-semibold uppercase tracking-[0.22em]', ui.muted)}>Category</p>
                    <form className="mt-3 flex flex-col gap-3 sm:flex-row" action={taskConfig?.route || '#'}>
                      <select name="category" defaultValue={normalizedCategory} className={cn('h-11 flex-1 rounded-xl px-3 text-sm', ui.input)}>
                        <option value="all">All categories</option>
                        {CATEGORY_OPTIONS.map((item) => (
                          <option key={item.slug} value={item.slug}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <button type="submit" className={cn('h-11 shrink-0 rounded-xl px-5 text-sm font-semibold', ui.button)}>
                        Apply
                      </button>
                    </form>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={taskConfig?.route || '/classifieds'}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                        normalizedCategory === 'all' ? 'bg-[#2d5a4c] text-white' : 'border border-[#dfe8e4] bg-white text-[#4a635c] hover:bg-[#eef5f2]',
                      )}
                    >
                      All
                    </Link>
                    {CATEGORY_OPTIONS.slice(0, 10).map((opt) => (
                      <Link
                        key={opt.slug}
                        href={`${taskConfig?.route}?category=${opt.slug}`}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                          normalizedCategory === opt.slug ? 'bg-[#2d5a4c] text-white' : 'border border-[#dfe8e4] bg-white text-[#4a635c] hover:bg-[#eef5f2]',
                        )}
                      >
                        {opt.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: 'Scan-friendly rows',
                  body: 'Title, category, and location stay aligned for quick triage on phones.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Trust-forward framing',
                  body: 'Encourage photos, clear prices, and consistent seller signals before you DM.',
                },
                {
                  icon: Camera,
                  title: 'Pair with gallery',
                  body: 'Cross-link drops with the image wall so buyers see proof, not just copy.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.35rem] border border-[#dfe8e4] bg-white p-5 shadow-sm">
                  <item.icon className="h-5 w-5 text-[#2d5a4c]" />
                  <p className="mt-3 text-sm font-semibold text-[#1a2e28]">{item.title}</p>
                  <p className={cn('mt-2 text-sm leading-relaxed', ui.muted)}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
