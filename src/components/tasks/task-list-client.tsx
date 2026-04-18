"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Camera, Image as ImageIcon, Tag } from "lucide-react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";
import { cn } from "@/lib/utils";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  const isImage = task === "image";
  const isClassified = task === "classified";

  if (!merged.length) {
    return (
      <div className="overflow-hidden rounded-[1.75rem] border border-[#dfe8e4] bg-[linear-gradient(165deg,#ffffff_0%,#f4faf7_100%)] px-6 py-14 text-center sm:px-10">
        {isImage ? (
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5f2] text-[#2d5a4c]">
            <ImageIcon className="h-7 w-7" />
          </div>
        ) : (
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5f2] text-[#2d5a4c]">
            <Tag className="h-7 w-7" />
          </div>
        )}
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#1a2e28]">
          {isImage ? "No gallery posts yet" : "No classifieds in this view"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#4a635c]">
          {isImage
            ? "Be the first to publish a photo story. The grid will light up with masonry tiles as soon as uploads land."
            : "Try another category pill above, or post a deal so this board fills in with local inventory."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="rounded-full bg-[#2d5a4c] text-white hover:bg-[#23463c]">
            <Link href={isImage ? "/create/image" : "/create/classified"} className="inline-flex items-center gap-2">
              {isImage ? "Upload photos" : "Post a deal"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-[#dfe8e4] bg-white">
            <Link href={isImage ? "/classifieds" : "/images"}>{isImage ? "Browse deals" : "Open gallery"}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-[#dfe8e4] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5a6f68]">
            {isImage ? "Gallery stream" : "Live board"}
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a2e28]">
            {isImage ? "Latest uploads" : "Fresh listings"}
          </h2>
        </div>
        <p className="text-sm text-[#4a635c]">
          Showing <span className="font-semibold text-[#1a2e28]">{merged.length}</span>{" "}
          {merged.length === 1 ? "result" : "results"}
          {category && category !== "all" ? (
            <span className="text-[#5a6f68]">
              {" "}
              in <span className="font-medium text-[#2d5a4c]">{category.replace(/-/g, " ")}</span>
            </span>
          ) : null}
        </p>
      </div>

      <div
        className={cn(
          "grid gap-5",
          isImage ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {merged.map((post) => {
          const localOnly = (post as any).localOnly;
          const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug);
          return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
        })}
      </div>

      {(isImage || isClassified) && merged.length >= 8 ? (
        <div className="flex justify-center pt-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#dfe8e4] bg-white px-4 py-2 text-xs font-medium text-[#5a6f68]">
            <Camera className="h-3.5 w-3.5 text-[#2d5a4c]" />
            End of feed — adjust filters above to widen results
          </p>
        </div>
      ) : null}
    </div>
  );
}
