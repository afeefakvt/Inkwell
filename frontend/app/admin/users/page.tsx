"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserBlock } from "@/lib/api/admin";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        setUsers(res.users);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleBlock = async (id: string, current: boolean) => {
    try {
      await updateUserBlock(id, { isBlocked: !current });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isBlocked: !current } : u
        )
      );
      toast.success(`User ${!current ? "blocked" : "unblocked"} successfully`);
    } catch (err: any) {
      toast.error(err.message || "Error updating user status");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 text-center">
                  <Switch
                    checked={u.isBlocked}
                    onCheckedChange={() => handleToggleBlock(u._id, u.isBlocked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="p-4 bg-white rounded-lg shadow-md border space-y-2"
          >
            <p className="text-sm">
              <span className="font-semibold">Name:</span> {u.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Email:</span> {u.email}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Blocked:</span>
              <Switch
                checked={u.isBlocked}
                onCheckedChange={() => handleToggleBlock(u._id, u.isBlocked)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
