"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

export default function TextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      // Use StarterKit with default list configuration (simplest solution)
      StarterKit,
      Underline,
      Highlight,
      Link.configure({
        openOnClick: true,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "<p>Start writing your post...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      if (editor) editor.destroy();
    };
  }, [editor]);

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="p-4 min-h-[200px] bg-white">
          <p>Loading editor...</p>
        </div>
      </div>
    );
  }

  // === Toolbar helper functions ===
  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = prompt("Enter link URL:");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-100 border-b border-gray-300">
        {/* Bold / Italic / Underline */}
        {[
          {
            label: "B",
            action: () => editor.chain().focus().toggleBold().run(),
            active: editor.isActive("bold"),
          },
          {
            label: "I",
            action: () => editor.chain().focus().toggleItalic().run(),
            active: editor.isActive("italic"),
          },
          {
            label: "U",
            action: () => editor.chain().focus().toggleUnderline().run(),
            active: editor.isActive("underline"),
          },
        ].map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={btn.action}
            className={`px-3 py-1 text-sm font-bold rounded ${
              btn.active
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {btn.label}
          </button>
        ))}

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          H2
        </button>

        {/* Bullet List - FIXED */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          • List
        </button>

        {/* Numbered List - FIXED */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          1.
        </button>

        {/* Highlight */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("highlight")
              ? "bg-yellow-400 text-black"
              : "bg-white text-gray-700 border"
          }`}
        >
          ✨
        </button>

        {/* Links & Images */}
        <button
          type="button"
          onClick={setLink}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("link")
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          🔗 Link
        </button>

        <button
          type="button"
          onClick={addImage}
          className="px-3 py-1 text-sm bg-white text-gray-700 border rounded"
        >
          🖼️ Image
        </button>

        {/* Alignment */}
        {[
          { align: "left", label: "⬅️" },
          { align: "center", label: "⬆️" },
          { align: "right", label: "➡️" },
        ].map(({ align, label }) => (
          <button
            key={align}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={`px-3 py-1 text-sm rounded ${
              editor.isActive({ textAlign: align })
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {label}
          </button>
        ))}

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 py-1 text-sm bg-white text-gray-700 border rounded"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 py-1 text-sm bg-white text-gray-700 border rounded"
        >
          Redo
        </button>
      </div>

      {/* Editor content area */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] focus:outline-none prose prose-sm max-w-none"
      />
    </div>
  );
}