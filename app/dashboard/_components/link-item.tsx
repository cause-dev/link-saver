"use client";

import { deleteLink } from "../_actions/links";

const LinkItem = ({
  id,
  url,
  title,
}: {
  id: string;
  url: string;
  title: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-5 rounded-3xl bg-active px-5 py-2">
      <a href={url} target="_blank" className="flex gap-3">
        <h3 className="font-bold">{title}</h3>
        <p>{url}</p>
      </a>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" />
        <div className="h-6 w-10 rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-blue-600"></div>
        <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 peer-checked:translate-x-4"></div>
        <span className="ml-2 text-sm font-medium text-gray-700">isRead</span>
      </label>
      <button
        onClick={() => deleteLink(id)}
        className="cursor-pointer rounded-full bg-blue-3 px-5 py-2"
      >
        Delete
      </button>
    </div>
  );
};

export default LinkItem;
