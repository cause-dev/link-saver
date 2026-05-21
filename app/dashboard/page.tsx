import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            className="flex gap-3 rounded-3xl bg-active px-5 py-2"
          >
            <h3 className="font-bold">{link.title}</h3>
            <p>{link.url}</p>
          </a>
        );
      })}
    </div>
  );
};

export default DashboardPage;
