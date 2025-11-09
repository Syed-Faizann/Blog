import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 8;
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
    include: { author: true },
  });

  return Response.json({ posts });
}
