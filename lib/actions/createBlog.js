"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createBlog(formData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error("Not authenticated");
  }

  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const excerpt = content.replace(/<[^>]*>?/gm, "").slice(0, 150) + "...";

  // ✅ Save post in a variable
  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      image: imageUrl || null,
      authorId: session.user.id,
    },
  });

  return post.slug; // ✅ now this works
}
