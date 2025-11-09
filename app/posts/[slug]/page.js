// app/posts/[slug]/page.js
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CommentSection from "@/app/components/CommentSection";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import me from "@/public/me2.jpg";
import Link from "next/link";

export default async function PostPage({ params: rawParams }) {
  // Unwrap params if it's a Promise
  const params = await rawParams; 
  const slug = params.slug;

  if (!slug) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        Slug missing in URL!
      </div>
    );
  }

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!post) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        Post not found 😕
      </div>
    );
  }
    const session = await getServerSession(authOptions);
  const currentUser = session?.user || null;

  return (
    <>
      <Navbar />
      <main className="px-14 mt-24">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <div className="text-center">
            <h1 className="text-5xl font-semibold mb-6">{post.title}</h1>
            <div className="flex justify-center items-center gap-3 text-gray-600 text-sm">
              <Image
                src={me}
                alt="Author"
                width={35}
                height={35}
                className="rounded-full"
              />
              <span>
                {post.author?.name || "Unknown Author"} ·{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="mt-10 w-full h-[450px] relative rounded-2xl overflow-hidden shadow-md">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Post Content */}
          <div
            className="prose prose-lg max-w-none mt-10 text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
            />

             <CommentSection postId={post.id} currentUser={currentUser} />
          {/* Back link / last updated */}
          <div className="mt-16 flex justify-between items-center border-t pt-6">
            <Link
              href="/"
              className="text-blue-600 font-medium hover:underline"
            >
              ← Back to Home
            </Link>
            <p className="text-sm text-gray-500">
              {post.updatedAt
                ? `Last updated on ${new Date(post.updatedAt).toLocaleDateString(
                    "en-US",
                    { day: "2-digit", month: "short", year: "numeric" }
                  )}`
                : ""}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
