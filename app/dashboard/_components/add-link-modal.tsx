"use client";

import React from "react";
import { useEffect, useActionState, RefObject } from "react";
import { addLink } from "../_actions/links";
import AddLinkForm from "./add-link-form";

type Props = {
  ref: RefObject<HTMLDialogElement | null>;
};

const AddLinkModal = ({ ref }: Props) => {
  const [state, action, isPending] = useActionState(addLink, null);

  useEffect(() => {
    if (state?.success) {
      (ref as React.RefObject<HTMLDialogElement>).current?.close();
    }
  }, [state, ref]);

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          ref.current?.close();
        }
      }}
      className="w-full max-w-md rounded-3xl bg-surface-2 p-0 text-fg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-6 px-10 py-8">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-lg font-bold">Add Link</h2>
          <p className="text-sm text-fg/60">Save a link for later.</p>
        </div>

        <form className="flex w-full flex-col gap-4" action={action}>
          <div className="relative w-full">
            <input
              type="text"
              name="title"
              id="link-title"
              placeholder=" "
              className="peer w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 pt-5 pb-2 text-sm text-zinc-100 shadow-sm transition-all duration-200 ease-out focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
            />
            <label
              htmlFor="link-title"
              className="translate-all pointer-events-none absolute top-3 left-4 text-zinc-400 duration-200 ease-out peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Title
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="url"
              name="url"
              id="link-url"
              placeholder=" "
              className="peer w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 pt-5 pb-2 text-sm text-zinc-100 shadow-sm transition-all duration-200 ease-out focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
            />
            <label
              htmlFor="link-url"
              className="translate-all pointer-events-none absolute top-3 left-4 text-zinc-400 duration-200 ease-out peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
            >
              URL
            </label>
          </div>
          <div className="relative w-full">
            <input
              id="link-tags"
              name="tags"
              type="text"
              placeholder=" "
              className="peer w-full rounded-xl border border-zinc-300/80 bg-zinc-100 px-4 pt-5 pb-2 text-sm text-zinc-900 shadow-sm transition-all duration-200 ease-out focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />

            <label
              htmlFor="link-tags"
              className="pointer-events-none absolute top-3 left-4 text-sm text-zinc-500 transition-all duration-200 ease-out peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs dark:text-zinc-400"
            >
              Tags
            </label>
          </div>
          {/* error message */}
          {state?.error && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}
          {/* actions */}
          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                (ref as React.RefObject<HTMLDialogElement>).current?.close()
              }
              className="rounded-full px-5 py-2 text-sm text-fg/70 transition-colors hover:text-fg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddLinkModal;
