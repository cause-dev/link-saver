import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import LinksSection from "./_components/links-section";

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
    include: {
      tags: true,
    },
  });

  const tags = await prisma.tag.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <LinksSection links={links} tags={tags} />;
};

export default DashboardPage;
