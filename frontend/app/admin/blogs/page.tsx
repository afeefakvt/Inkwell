"use client";

import { useEffect, useState } from "react";
import { getAllBlogs, updateBlogBlock } from "@/lib/api/admin";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Blog {
  _id: string;
  title: string;
  content: string;
  isBlocked: boolean;
  createdAt: string;
  author: { name: string; email: string };
}

export default function BlogsTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await getAllBlogs();
        setBlogs(res.blogs);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleToggleBlock = async (id: string, current: boolean) => {
    try {
      await updateBlogBlock(id, { isBlocked: !current });
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, isBlocked: !current } : b))
      );
      toast.success(`Blog ${!current ? "blocked" : "unblocked"} successfully`);
    } catch (err: any) {
      toast.error(err.message || "Error updating blog status");
    }
  };

  if (loading) return <p className="p-4 text-center">Loading blogs...</p>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-center">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="px-4 py-2">{b.title}</td>
                <td className="px-4 py-2">
                  {b.author?.name}
                  <br />
                  <span className="text-xs text-gray-500">
                    {b.author?.email}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <Switch
                    checked={b.isBlocked}
                    onCheckedChange={() =>
                      handleToggleBlock(b._id, b.isBlocked)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-3 p-3">
        {blogs.map((b) => (
          <div key={b._id} className="border rounded-lg p-3 shadow-sm">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-sm text-gray-600">
              {b.author?.name} ({b.author?.email})
            </p>
            <p className="text-xs text-gray-500">
              {new Date(b.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm">Blocked</span>
              <Switch
                checked={b.isBlocked}
                onCheckedChange={() =>
                  handleToggleBlock(b._id, b.isBlocked)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
