import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const link = await prisma.link.create({
      data: {
        title: body.title,
        url: body.url,
        tags: body.tags,
      },
    });

    return Response.json(link, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create user", message: error },
      { status: 500 },
    );
  }
}
