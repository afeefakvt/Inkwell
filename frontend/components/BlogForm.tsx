"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { publishBlog } from "@/lib/api/blog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const router = useRouter();

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters.";
    } else if (title.trim().length > 100) {
      newErrors.title = "Title cannot exceed 100 characters.";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required.";
    } else if (content.trim().length < 20) {
      newErrors.content = "Content must be at least 20 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await publishBlog({ title: title.trim(), content: content.trim() });
      console.log("Blog created:", res);

      toast.success("Blog published successfully");
      setTitle("");
      setContent("");
      router.push("/blogs");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <Textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px]"
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
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
