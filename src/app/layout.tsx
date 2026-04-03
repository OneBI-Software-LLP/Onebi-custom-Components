import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar-context";
import { AppSidebar } from "@/components/ui/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onebi UI - Component Library",
  description: "Advanced React Component Library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen bg-[#FDFDFD]">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
