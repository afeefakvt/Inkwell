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
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
