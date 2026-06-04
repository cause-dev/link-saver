"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Search, X, Hash, RotateCcw } from "lucide-react";

type Tag = {
  id: string;
  name: string;
};

type Props = {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const DashboardToolbar = ({
  tags,
  selectedTags,
  setSelectedTags,
  searchQuery,
  setSearchQuery,
}: Props) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const hasActiveFilters = selectedTags.length > 0;

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.id === tag.id)
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag],
    );
  };

  const isTagSelected = (tagId: string) =>
    selectedTags.some((t) => t.id === tagId);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Bar: Search & Filter Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/30">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by title or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pr-12 pl-11 text-sm text-white placeholder-white/30 transition-all outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white"
            >
              <div className="rounded-full bg-white/10 p-1">
                <X size={14} />
              </div>
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all active:scale-95 ${
            showFilters || hasActiveFilters
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <SlidersHorizontal size={18} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-blue-600">
              {selectedTags.length}
            </span>
          )}
        </button>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/2 p-5 transition-all">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/40">
              <Hash size={14} />
              <span className="text-[11px] font-bold tracking-widest uppercase">
                Filter by tags
              </span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={() => setSelectedTags([])}
                className="flex items-center gap-1.5 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                <RotateCcw size={12} />
                Reset tags
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all active:scale-90 ${
                    isTagSelected(tag.id)
                      ? "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/50"
                      : "border border-white/5 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={
                      isTagSelected(tag.id) ? "text-blue-400" : "text-white/20"
                    }
                  >
                    #
                  </span>
                  {tag.name}
                </button>
              ))
            ) : (
              <p className="text-xs text-white/20 italic">
                No tags available yet...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardToolbar;
