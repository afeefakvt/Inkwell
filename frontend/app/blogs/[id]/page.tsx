"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IBlog } from "@/types/blog";
import { getBlogById } from "@/lib/api/blog";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id as string);
        console.log(data,"hbvjds");
        
        setBlog(data.blog);
      } catch (err: any) {
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!blog) return <p className="text-center py-10">No blog found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => router.push("/blogs")}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" /> Back to all posts
      </button>

      <h1 className="text-4xl font-bold text-[#6b2737] mb-4">{blog.title}</h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div>
          <p className="font-medium text-gray-900">{blog.author.name}</p>
          <p className="text-sm text-gray-500">@{blog.author.email.split("@")[0]}</p>
          <p className="text-sm text-gray-500">
            {new Date(blog.createdAt).toDateString()} 
          </p>
        </div>
      </div>


      <hr className="my-6" />

      {/* Content */}
      <div className="prose prose-lg text-gray-800">
        {blog.content}
      </div>
    </div>
  );
}
