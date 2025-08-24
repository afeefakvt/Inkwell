"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateUser } from "@/redux/userSlice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateProfile, changePassword, getMyBlogs } from "@/lib/api/user";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { deleteBlog } from "@/lib/api/blog";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // blogs state
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  if (!user) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const res = await getMyBlogs();
        setBlogs(res.blogs);
      } catch (err: any) {
        toast.error(err.message || "Failed to load blogs");
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateProfile({
        name: profile.name,
        email: profile.email,
      });

      dispatch(updateUser({ user: { ...user, ...updated } }));

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await changePassword(passwords);
      toast.success("Password changed successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err: any) {
      toast.error(err.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      toast.error(err.message || "Error deleting blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {!isEditing ? (
        <Card className="mb-6">
          <CardHeader className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-3" />
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="mt-4 md:mt-0 bg-[#6b2737] text-white rounded-lg hover:bg-[#581c2b] transition cursor-pointer"
            >
              Edit Profile
            </Button>
          </CardHeader>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleProfileUpdate}>
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1.5 bg-[#6b2737] text-white rounded-lg hover:bg-[#581c2b] transition cursor-pointer"
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="blogs" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-sm mx-auto mb-4">
          <TabsTrigger value="blogs">My Blogs</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>

        <TabsContent value="blogs" className="space-y-4">
          {loadingBlogs ? (
            <p className="text-center py-4">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              You haven’t written any blogs yet.
            </p>
          ) : (
            blogs.map((blog) => (
              <Card key={blog._id}>
                <CardHeader>
                  <CardTitle onClick={()=>router.push(`/blogs/${blog._id}`)} className="cursor-pointer">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {blog.content.slice(0, 120)}...
                  </p>
                  <p className="text-xs mt-2 text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => router.push(`/blogs/${blog._id}/edit`)}
                      className="bg-[#6b2737] text-white rounded-lg hover:bg-[#581c2b] transition cursor-pointer"
                    >
                      Edit
                    </Button>

                    {/* Delete Confirmation */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive" className="cursor-pointer">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. It will permanently
                            delete your blog
                            <span className="font-semibold">
                              {" "}
                              “{blog.title}”
                            </span>
                            .
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="bg-red-600 hover:bg-red-700 cursor-pointer"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleChangePassword}>
                <div>
                  <label className="text-sm font-medium">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={passwords.confirmNewPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmNewPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full px-4 py-1.5 bg-[#6b2737] text-white rounded-lg hover:bg-[#581c2b] transition cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
