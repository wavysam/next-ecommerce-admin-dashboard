import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SideBar />
        <main className="sm:pl-64 sm:mx-12 mx-4">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
