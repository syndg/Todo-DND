import type { Metadata } from "next";
import { Karla } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";
import SideBar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo for SARAL",
  description: "Assignment for SARAL Frontend Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(karla.className, "relative")}>
        <Providers>
          <SideBar />
          <main className="ml-[320px] bg-muted min-h-screen">
            <ThemeToggle className="fixed right-2 bottom-2 rounded-[8px]" />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
