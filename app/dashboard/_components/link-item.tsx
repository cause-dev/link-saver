"use client";

import { useOptimistic, useTransition, useState } from "react";
import Image from "next/image";
import {
  Trash,
  ExternalLink,
  CheckCircle2,
  Circle,
  Globe,
  Loader2,
} from "lucide-react";
import { deleteLink, statusRead } from "../_actions/links";

interface Tag {
  id: string;
  name: string;
}

interface LinkItemProps {
  id: string;
  url: string;
  title: string;
  isRead: boolean;
  favicon: string;
  tags?: Tag[]; // Added tags support
}

const LinkItem = ({
  id,
  url,
  title,
  isRead,
  favicon,
  tags = [],
}: LinkItemProps) => {
  const [optimisticRead, setOptimisticRead] = useOptimistic(isRead);
  const [isPending, startTransition] = useTransition();
  const [imgSrc, setImgSrc] = useState(favicon);

  const handleToggleRead = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if this was wrapped in a link
    startTransition(async () => {
      setOptimisticRead(!optimisticRead);
      await statusRead(id, !optimisticRead);
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this link?")) {
      startTransition(async () => {
        await deleteLink(id);
      });
    }
  };

  // Clean URL for display
  const displayUrl = url
    ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
    : "";

  const newLocal = "border-white/5 bg-white/[0.02] opacity-70";
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 ${
        optimisticRead
          ? newLocal
          : "border-white/10 bg-[#1e1e38] shadow-lg hover:border-blue-500/50 hover:bg-[#232345] hover:shadow-blue-500/10"
      }`}
    >
      {/* Top Section: Favicon & Status */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner">
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt="favicon"
                width={24}
                height={24}
                className={`transition-all duration-500 ${optimisticRead ? "grayscale" : ""}`}
                onError={() => setImgSrc("")} // Fallback to icon on error
              />
            ) : (
              <Globe className="text-white/20" size={20} />
            )}
          </div>

          <button
            onClick={handleToggleRead}
            disabled={isPending}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-all ${
              optimisticRead
                ? "bg-green-500/10 text-green-400"
                : "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
            }`}
          >
            {isPending ? (
              <Loader2 size={12} className="animate-spin" />
            ) : optimisticRead ? (
              <CheckCircle2 size={12} />
            ) : (
              <Circle size={12} />
            )}
            {optimisticRead ? "Read" : "Mark Read"}
          </button>
        </div>

        {/* Content: Title & URL */}
        <div className="mt-4 space-y-1.5">
          <h3
            className={`line-clamp-2 text-base leading-snug font-bold transition-colors ${
              optimisticRead
                ? "text-white/40 line-through"
                : "text-[#e0e0ff] group-hover:text-blue-400"
            }`}
          >
            {title || "Untitled Link"}
          </h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-white/30 hover:text-blue-400"
          >
            <span className="truncate">{displayUrl}</span>
            <ExternalLink size={12} className="shrink-0" />
          </a>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/40"
              >
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/20">
              #Uncategorized
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t border-white/5 bg-white/2 px-5 py-3">
        <button
          onClick={handleDelete}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/20 transition-all hover:bg-red-400/10 hover:text-red-400"
          title="Delete Link"
        >
          <Trash size={18} />
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-bold tracking-widest text-white/40 uppercase transition-colors hover:text-white"
        >
          Open Link
        </a>
      </div>
    </div>
  );
};

export default LinkItem;
