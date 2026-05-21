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

  console.log(links);
  return (
    <div className="flex w-full items-center justify-center">
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
