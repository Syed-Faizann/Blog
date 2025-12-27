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

      <main className="mt-20 w-full">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <header className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-5">
              {post.title}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-3 text-gray-600 text-sm">
              <Image
                src={me}
                alt="Author"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="break-words text-center">
                {post.author?.name || "Unknown Author"} ·{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </header>

          {/* IMAGE */}
          {post.image && (
            <div className="mt-8 sm:mt-10 relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* POST CONTENT — FIXED */}
          <article
            className="
               prose prose-base sm:prose-lg
    max-w-none
    mt-8 sm:mt-10
    text-gray-800 leading-relaxed
    border-2 border-gray-300 rounded-lg
    p-4 sm:p-6

    break-words
    whitespace-normal
    overflow-x-auto
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* COMMENTS */}
          <section className="mt-12">
            <CommentSection postId={post.id} currentUser={currentUser} />
          </section>

          {/* FOOTER */}
          <footer className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-6">
            <Link
              href="/"
              className="text-blue-600 font-medium hover:underline"
            >
              ← Back to Home
            </Link>

            {post.updatedAt && (
              <p className="text-sm text-gray-500">
                Last updated on{" "}
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </footer>
        </div>
      </main>

      <Footer />
    </>
  );
}
