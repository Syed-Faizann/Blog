"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoadMorePosts({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?page=${page + 1}`);
      const data = await res.json();

      if (!data.posts || data.posts.length < 8) setHasMore(false);

      setPosts((prev) => [...prev, ...data.posts]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to load more posts:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="bg-white text-left flex flex-col hover:-translate-y-1 hover:shadow-md transition duration-300"
          >
            {/* Post Image */}
            <div className="w-full h-[220px] overflow-hidden rounded-xl">
              <Image
                src={post.image || "/placeholder.jpg"}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Info */}
            <div className="pt-4 p-2">
              <h2 className="text-lg font-bold leading-snug hover:text-blue-600 cursor-pointer">
                {post.title}
              </h2>
              <p className="pt-2 text-sm text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Author / Post Thumbnail */}
              <div className="flex items-center gap-3 pt-4">
                <Image
                  src={post.image || "/placeholder.jpg"} // Use post image here
                  alt={post.title}
                  width={30}
                  height={30}
                  className="rounded-full object-cover h-10 w-10"
                />
                <span className="text-sm text-gray-700">
                  {post.author?.name || "Unknown Author"} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
