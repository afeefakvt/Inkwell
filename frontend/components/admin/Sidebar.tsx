"use client";

import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Users", href: "/admin/users" },
  { name: "Blogs", href: "/admin/blogs" },
  { name: "Settings", href: "/admin/settings" },
];

export function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();

  const sidebarContent = (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 transition",
            pathname === item.href ? "bg-gray-200 text-gray-900" : "text-gray-600"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 w-64">{sidebarContent}</DialogContent>
      </Dialog>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-white">
        {sidebarContent}
      </aside>
    </>
  );
}
