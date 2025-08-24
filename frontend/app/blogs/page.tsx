"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IBlog } from "@/types/blog";
import { getBlogs } from "@/lib/api/blog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        setBlogs(data.blogs);
      } catch (err: any) {
        setError(err.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#6b2737]">Discover Stories</h1>
        <p className="text-gray-600 mt-2">
          Explore insights, stories, and ideas from our community of writers
        </p>
      </div>

      {loading && <p className="text-center text-gray-500">Loading blogs...</p>}

      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {!loading && !error && blogs.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog._id} href={`/blogs/${blog._id}`}>
              <Card className="h-full flex flex-col rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {blog.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {blog.author.name} •{" "}
                    {new Date(blog.createdAt).toDateString()}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-gray-700 mb-3 line-clamp-3 flex-grow">
                    {blog.content}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && blogs.length === 0 && (
        <p className="text-center text-gray-500">No blogs available yet.</p>
      )}
    </div>
  );
}
