"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import me from "@/public/me2.jpg";
import { createComment } from "@/lib/actions/createcomment";
import { fetchComments } from "@/lib/actions/fetchComments";
import CommentList from "@/app/components/CommentList";

export default function CommentSection({ postId, currentUser }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isPending, startTransition] = useTransition();

  // Fetch comments on mount & when postId changes
  const refreshComments = async () => {
    if (!postId) return;
    try {
      const data = await fetchComments(postId);
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    startTransition(refreshComments);
  }, [postId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim() || !postId) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("content", comment);
        formData.append("postId", postId);

        await createComment(formData);

        setComment("");

        await refreshComments();
      } catch (err) {
        console.error("Failed to post comment:", err);
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-5">Comments</h2>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex items-start gap-3 mb-8">
        <Image
          src={currentUser?.image || me}
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a public comment..."
            rows={2}
            className="w-full border rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none bg-gray-50"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
            >
              {isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>

      {/* Render comments recursively */}
      {comments.length > 0 ? (
        <CommentList
          comments={comments}
          postId={postId}
          currentUser={currentUser}
          refreshComments={refreshComments}
        />
      ) : (
        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}
