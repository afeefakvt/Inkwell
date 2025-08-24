"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function RouteGuardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const guestOnlyRoutes = ["/login", "/signup"];
  const protectedRoutes = ["/blogs/create", "/profile","/blogs/[id]/edit"];

  useEffect(() => {
    if (guestOnlyRoutes.includes(pathname) && isAuthenticated) {
      // Logged-in user trying to access login/signup
      router.replace("/");
    } else if (protectedRoutes.includes(pathname) && !isAuthenticated) {
      // Guest trying to access protected route
      router.replace("/login");
    }
  }, [pathname, isAuthenticated, router]);

  return <>{children}</>;
}
