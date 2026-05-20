"use client";

import type React from "react";

import { ChangeEvent, FormEvent, SubmitEventHandler, useState } from "react";

const AddLink = () => {
  const [form, setForm] = useState({
    title: "",
    url: "",
    tags: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        url: form.url,
        tags: form.tags.split(",").map((tag) => tag.trim()),
      }),
    });

    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="flex w-full max-w-100 flex-col items-center justify-center gap-10 rounded-3xl bg-[#3d3846] px-10 py-20">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="mb-2 text-lg font-bold">Add Link</h2>
        <p>Save Link for later.</p>
      </div>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="text"
            name="title"
            id="link-title"
            placeholder=" "
            value={form.title}
            onChange={handleChange}
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
            value={form.url}
            onChange={handleChange}
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
            value={form.tags}
            onChange={handleChange}
            className="peer w-full rounded-xl border border-zinc-300/80 bg-zinc-100 px-4 pt-5 pb-2 text-sm text-zinc-900 shadow-sm transition-all duration-200 ease-out focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />

          <label
            htmlFor="link-tags"
            className="pointer-events-none absolute top-3 left-4 text-sm text-zinc-500 transition-all duration-200 ease-out peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs dark:text-zinc-400"
          >
            Tags
          </label>
        </div>
        <button
          type="submit"
          className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-full border border-blue-500/60 bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-out hover:bg-blue-500 hover:ring-4 hover:ring-blue-400/25 focus:ring-4 focus:ring-blue-400/35 focus:outline-none active:scale-[0.985]"
        >
          Add Link
        </button>
      </form>
    </div>
  );
};

export default AddLink;
