"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { UploadButton } from "@/lib/upload-thing";
import { createBlog } from "@/lib/actions/createBlog";
import Navbar from "@/app/components/Navbar";
import { useTransition } from "react";
import { useRouter } from "next/navigation"; // ✅ import useRouter

const TextEditor = dynamic(() => import("@/app/components/TextEditor"), {
  ssr: false, // 👈 disables SSR
});

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter(); // ✅ initialize router

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Create New Post
        </h1>

        {/* ✅ Updated form with onSubmit for client-side navigation */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent default form submission
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (imageUrl) {
              formData.append("imageUrl", imageUrl);
            }

            startTransition(async () => {
              const slug = await createBlog(formData); // get slug from server action
              router.push(`/posts/${slug}`); // navigate to the new post page
            });
          }}
        >
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Cover Image
            </label>

            {imageUrl ? (
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={imageUrl}
                  alt="Post cover"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-500 mb-3">
                  Upload your post cover image
                </p>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0].ufsUrl) {
                      setImageUrl(res[0].ufsUrl);
                    }
                  }}
                  onUploadError={(error) => {
                    console.error("Upload error", error);
                  }}
                />
              </div>
            )}
          </div>

          {/* Text Editor */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Post Content
            </label>
            <TextEditor
              className="outline-0 border-0"
              content="<p>Start writing your post...</p>"
              onChange={setContent}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
