import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import DashboardToolbar from "./_components/dashboard-toolbar";
import LinkItem from "./_components/link-item";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const tags = await prisma.tag.findMany({
    orderBy: { createdAt: "desc" },
  });

  console.log(tags);

  return (
    <div className="grid w-full items-center justify-center gap-4">
      <DashboardToolbar tags={tags} />
      {links.map((link) => {
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

export default DashboardPage;
