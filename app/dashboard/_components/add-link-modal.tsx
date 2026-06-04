"use client";

import React, { useEffect, useActionState } from "react";
import type { RefObject } from "react";
import { X, Link as LinkIcon, Tag, Type, Loader2 } from "lucide-react";
import { addLink } from "../_actions/links";

type Props = {
  ref: RefObject<HTMLDialogElement | null>;
};

const AddLinkModal = ({ ref }: Props) => {
  const [state, action, isPending] = useActionState(addLink, null);

  // Close modal when link is successfully added
  useEffect(() => {
    if (state?.success) {
      ref.current?.close();
    }
  }, [state, ref]);

  const handleClose = () => {
    ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        // Close if clicking the backdrop
        if (e.target === e.currentTarget) handleClose();
      }}
      className="m-auto w-[95vw] max-w-md rounded-2xl border border-white/10 bg-[#121225] p-0 text-white shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
              <LinkIcon size={18} />
            </div>
            <h3 className="text-lg font-semibold text-white">Add New Link</h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form action={action} className="p-6">
          <div className="space-y-5">
            {/* Title Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-white/40 uppercase"
              >
                <Type size={14} />
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="e.g. Portfolio Inspiration"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* URL Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="url"
                className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-white/40 uppercase"
              >
                <LinkIcon size={14} />
                URL
              </label>
              <input
                type="url"
                name="url"
                id="url"
                required
                placeholder="https://example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="tags"
                className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-white/40 uppercase"
              >
                <Tag size={14} />
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="design, dev, tools"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Error handling */}
            {state?.error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                {state.error}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex min-w-25 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Link"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddLinkModal;
