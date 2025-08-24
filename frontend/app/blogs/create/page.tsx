"use client";

import BlogForm from "@/components/BlogForm";

export default function CreateBlogPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl text-[#6b2737] font-semibold mb-6">Create a New Blog</h1>
      <BlogForm />
    </div>
  );
}
