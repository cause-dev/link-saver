"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function deleteLink(id: string) {
  await prisma.link.delete({ where: { id } });

  revalidatePath("/dashboard");
}

export async function statusRead(id: string, isRead: boolean) {
  await prisma.link.update({
    where: { id },
    data: { isRead, readAt: isRead ? new Date() : null },
  });
  revalidatePath("/dashboard");
}

export async function addLink(prevState: unknown, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return { error: "Unauthorized" };

  const url = formData.get("url") as string;
  const title = formData.get("title") as string;
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!url) return { error: "URL is required" };

  try {
    await prisma.link.create({
      data: {
        url,
        title,
        userId: session.user.id,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "This URL has already been saved." };
    }

    return { error: error.message ?? "Failed to create link" };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
