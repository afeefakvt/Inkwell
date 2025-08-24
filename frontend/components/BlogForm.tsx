"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { publishBlog } from "@/lib/api/blog";
import { useRouter } from "next/navigation";
import {
  blogValidationSchema,
  BlogFormValues,
} from "@/lib/vaidations/blogValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await publishBlog({ title, content });

      console.log("Blog created:", res);
      toast.success("Blog published successfully");
      setTitle("");
      setContent("");
      router.push("/blogs");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <Textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="px-4 py-1.5 bg-[#6b2737] text-white rounded-lg hover:bg-[#581c2b] transition cursor-pointer"
      >
        {loading ? "Publishing..." : "Publish Blog"}
      </Button>
    </form>
  );
}
