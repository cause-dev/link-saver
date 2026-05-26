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

  const filteredLinks = useMemo(() => {
    return links.filter((link) => {
      return (
        selectedTags.length === 0 ||
        selectedTags.some((tag) => {
          return link.tags.some((t) => t.id === tag.id);
        })
      );
    });
  }, [selectedTags, links]);

  return (
    <div className="grid w-full items-center justify-center gap-4">
      <DashboardToolbar
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
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
