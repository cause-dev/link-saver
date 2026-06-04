"use client";

import LinkItem from "./link-item";

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
};

const LinksList = ({ links }: Props) => {
  return (
    <div
      aria-live="polite"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {links.map((link) => {
        let favicon = "";
        try {
          if (link.url) {
            const domain = new URL(link.url).hostname;
            favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
          }
        } catch (e) {
          favicon = ""; // Fallback handled in LinkItem
        }

        return (
          <LinkItem
            key={link.id}
            id={link.id}
            url={link.url}
            title={link.title || "Untitled Link"}
            isRead={link.isRead}
            favicon={favicon}
            tags={link.tags} // Passing tags for the UI
          />
        );
      })}
    </div>
  );
};

export default LinksList;
