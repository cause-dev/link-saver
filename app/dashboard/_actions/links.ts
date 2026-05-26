"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteLink(id: string) {
  await prisma.link.delete({ where: { id } });

  revalidatePath("/dashboard");
}

export async function statusRead(id: string, isRead: boolean) {
  await prisma.link.update({ where: { id }, data: { isRead } });
  revalidatePath("/dashboard");
}
