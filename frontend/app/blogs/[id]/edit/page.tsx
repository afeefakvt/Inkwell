"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { getBlogById, updateBlog } from "@/lib/api/blog";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(blogId);
        setBlog({ title: res.blog.title, content: res.blog.content });
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [blogId]);

  // validation function
  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!blog.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (blog.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters.";
    } else if (blog.title.trim().length > 100) {
      newErrors.title = "Title cannot exceed 100 characters.";
    }

    if (!blog.content.trim()) {
      newErrors.content = "Content is required.";
    } else if (blog.content.trim().length < 20) {
      newErrors.content = "Content must be at least 20 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await updateBlog(blogId, {
        title: blog.title.trim(),
        content: blog.content.trim(),
      });
      toast.success("Blog updated successfully");
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.message || "Error updating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                rows={8}
                value={blog.content}
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#6b2737] text-white hover:bg-[#581c2b]"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/profile")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
