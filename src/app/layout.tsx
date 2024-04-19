import NavigationBar from "@/components/navigation-bar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TES Club",
  description: "The Go Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div>
          <NavigationBar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}