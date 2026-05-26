"use client";

import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

type Tag = {
  id: string;
  name: string;
};

type Props = {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};

const DashboardToolbar = ({ tags, selectedTags, setSelectedTags }: Props) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const clearTags = () => {
    setSelectedTags([]);
  };

  const hasActiveFilters = selectedTags.length > 0;

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.id === tag.id)
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag],
    );
  };
  return (
    <div>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
          showFilters || selectedTags.length > 0
            ? "border border-blue-500/30 bg-blue-500/15 text-blue-400"
            : "bg-dark-600 border border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
        }`}
      >
        <SlidersHorizontal size={14} />
        Filters
        {selectedTags.length > 0 && (
          <span className="rounded-md bg-blue-500/20 px-1.5 py-0.5 font-mono text-xs text-blue-300">
            {selectedTags.length}
          </span>
        )}
      </button>

      {showFilters && (
        <div className="animate-slide-down">
          <div className="mt-4 border-t border-white/5 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-gray-500 uppercase">
                Filter by tags
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearTags}
                  className="cursor-pointer text-xs text-blue-400 transition-colors hover:text-blue-300"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "border border-blue-500/40 bg-blue-500/20 text-blue-300"
                      : "border border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardToolbar;
