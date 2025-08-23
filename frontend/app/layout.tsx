import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReduxProvider from "./providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Inkwell",
  description: "A modern blog application built with Next.js & TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <ReduxProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
