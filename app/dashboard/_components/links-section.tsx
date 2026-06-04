"use client";

import { useState, useMemo } from "react";
import { Library, SearchX, Sparkles } from "lucide-react";
import DashboardToolbar from "./dashboard-toolbar";
import LinksList from "./links-list";

type Tag = {
  id: string;
  name: string;
};

type Link = {
  id: string;
  title: string | null;
  url: string;
  isRead: boolean;
  tags: Tag[];
};

type Props = {
  links: Link[];
  tags: Tag[];
};

const LinksSection = ({ links, tags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredLinks = useMemo(() => {
    return links.filter((link) => {
      // Safety check: ensure url exists before processing
      if (!link.url) return false;

      const matchesSearch =
        searchQuery === "" ||
        link.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.url.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => {
          return link.tags?.some((t) => t.id === tag.id);
        });

      return matchesSearch && matchesTags;
    });
  }, [selectedTags, links, searchQuery]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-500">
            <Library size={20} />
            <span className="text-xs font-bold tracking-widest uppercase">
              Your Collection
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            My <span className="text-blue-500">Links</span>
          </h1>
          <p className="text-sm text-white/40">
            Manage and organize your saved resources.
          </p>
        </div>

        {/* Quick Stats Badge */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-md">
          <Sparkles size={16} className="text-yellow-500" />
          <span className="text-sm font-semibold text-white/90">
            {filteredLinks.length}{" "}
            {filteredLinks.length === 1 ? "Link" : "Links"}
          </span>
        </div>
      </div>

      {/* Toolbar Area */}
      <div className="mb-10">
        <DashboardToolbar
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Content Area */}
      <div className="min-h-100">
        {filteredLinks.length > 0 ? (
          <LinksList links={filteredLinks} />
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-white/20">
              <SearchX size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">No results found</h3>
            <p className="mt-2 max-w-xs text-sm text-white/40">
              We couldn’t find any links matching your current search or
              filters.
            </p>
            {(searchQuery !== "" || selectedTags.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTags([]);
                }}
                className="mt-6 text-sm font-bold text-blue-500 transition-colors hover:text-blue-400"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksSection;
