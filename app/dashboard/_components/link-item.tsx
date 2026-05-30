/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

import { deleteLink, statusRead } from "../_actions/links";

interface LinkItemProps {
  id: string;
  url: string;
  title: string;
  isRead: boolean;
  favicon: string;
}

const LinkItem = ({ id, url, title, isRead, favicon }: LinkItemProps) => {
  const [isReadStatus, setIsReadStatus] = useState<boolean>(isRead);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsReadStatus(e.target.checked);
    statusRead(id, e.target.checked);
  };
  console.log("isRead " + isReadStatus);
  return (
    <div className="flex items-center justify-center gap-5 rounded-3xl bg-active px-5 py-2">
      <img src={favicon} alt="favicon" width={30} height={30} />
      <a href={url} target="_blank" className="flex gap-3">
        <h3 className="font-bold">{title}</h3>
        <p>{url.length > 22 ? `${url.slice(0, 22 - 3)}...` : url}</p>
      </a>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isReadStatus}
          onChange={handleChange}
        />
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
