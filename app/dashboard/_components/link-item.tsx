/* eslint-disable @next/next/no-img-element */
"use client";

import { useOptimistic, useTransition } from "react";

import { Trash } from "lucide-react";

import { deleteLink, statusRead } from "../_actions/links";

interface LinkItemProps {
  id: string;
  url: string;
  title: string;
  isRead: boolean;
  favicon: string;
}

const LinkItem = ({ id, url, title, isRead, favicon }: LinkItemProps) => {
  const [optimisticRead, setOptimisticRead] = useOptimistic(isRead);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      setOptimisticRead(!optimisticRead);
      await statusRead(id, !optimisticRead);
    });
  };
  return (
    <div
      className={
        !optimisticRead
          ? "flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#1e1e38] p-4 transition-all hover:border-white/20"
          : "flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#1e1e38] p-4 opacity-35 transition-all hover:opacity-60"
      }
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-lg"
        aria-hidden="true"
      >
        <img src={favicon} alt="favicon" width={30} height={30} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 text-sm font-bold text-[#e0e0ff]">{title}</div>
        <div className="truncate text-xs text-white/30">{url}</div>
      </div>

      <span className="shrink-0 rounded-full bg-blue-500/20 px-2.5 py-1 text-[11px] font-bold text-[#a0a0ff]">
        Dev
      </span>

      <button
        className="shrink-0 cursor-pointer rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/25 transition-all hover:border-white/30 hover:text-white"
        onClick={handleClick}
        disabled={isPending}
      >
        {optimisticRead ? "Mark Unread" : "Mark Read"}
      </button>

      <button
        className="flex cursor-pointer items-center rounded-lg border border-white/10 p-1.5 text-sm text-white/25 transition-all hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400"
        onClick={() => deleteLink(id)}
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default LinkItem;
