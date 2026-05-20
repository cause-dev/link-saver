import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();

    const { title, url, tags } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const link = await prisma.link.create({
      data: {
        title,
        url,
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

    return NextResponse.json(link);
  } catch (error: any) {
    console.error("DEBUG - Prisma Error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This URL has already been saved." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        error: "Failed to create link",
        message: error.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
