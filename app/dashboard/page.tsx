import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

  return (
    <div className="grid w-full items-center justify-center gap-4">
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
