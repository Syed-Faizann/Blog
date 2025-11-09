"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import me from "@/public/me2.jpg";
import { createComment } from "@/lib/actions/createcomment";

export default function CommentList({ comments, postId, currentUser, refreshComments }) {
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleReplySubmit(e, parentId) {
    e.preventDefault();
    if (!replyText.trim()) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("content", replyText);
        formData.append("postId", postId);
        formData.append("parentId", parentId);

        await createComment(formData);

        setReplyText("");
        setReplyingToId(null);

        if (refreshComments) await refreshComments();
      } catch (err) {
        console.error("Failed to post reply:", err);
      }
    });
  }

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3 mt-4">
          <Image
            src={comment.user?.image || me}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="bg-gray-100 p-3 rounded-2xl w-full">
            <p className="text-sm font-semibold">{comment.user?.name || "Anonymous"}</p>
            <p className="text-sm">{comment.content}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
              <button
                onClick={() => setReplyingToId(comment.id)}
                className="hover:underline font-medium"
              >
                Reply
              </button>
            </div>

            {/* Inline Reply Input */}
            {replyingToId === comment.id && (
              <form
                onSubmit={(e) => handleReplySubmit(e, comment.id)}
                className="flex items-start gap-3 mt-3 ml-10"
              >
                <Image
                  src={currentUser?.image || me}
                  alt="User"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    rows={2}
                    className="w-full border rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none bg-gray-50"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="text-sm text-gray-500 hover:underline mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      {isPending ? "Posting..." : "Reply"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Nested Replies */}
            {comment.replies?.length > 0 && (
              <div className="pl-10 mt-3 space-y-3">
                <CommentList
                  comments={comment.replies}
                  postId={postId}
                  currentUser={currentUser}
                  refreshComments={refreshComments}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
