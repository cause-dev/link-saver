"use client";

import { useState, useMemo } from "react";

import DashboardToolbar from "./dashboard-toolbar";
import LinkItem from "./link-item";

type Link = {
  id: string;
  title: string | null;
  url: string;
  isRead: boolean;
  tags: Tag[];
};

type Tag = {
  id: string;
  name: string;
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
      const matchesSearch =
        searchQuery === "" ||
        link.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.url.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => {
          return link.tags.some((t) => t.id === tag.id);
        });

      return matchesSearch && matchesTags;
    });
  }, [selectedTags, links, searchQuery]);

  return (
    <div className="grid w-full items-center justify-center gap-4">
      <DashboardToolbar
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {filteredLinks.map((link) => {
        return (
          <LinkItem
            key={link.id}
            id={link.id}
            url={link.url}
            title={link.title!}
            isRead={link.isRead}
          />
        );
      })}
    </div>
  );
};

export default LinksSection;
