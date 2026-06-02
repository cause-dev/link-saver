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
};

const LinksList = ({ links }: Props) => {
  return (
    <div aria-live="polite" className="flex flex-col gap-1.5">
      {links.map((link) => {
        const favicon = new URL("/favicon.ico", link.url).toString();
        return (
          <LinkItem
            key={link.id}
            id={link.id}
            url={link.url}
            title={link.title!}
            isRead={link.isRead}
            favicon={favicon}
          />
        );
      })}
    </div>
  );
};

export default LinksList;
