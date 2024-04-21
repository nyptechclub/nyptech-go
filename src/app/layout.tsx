import NavigationBar from "@/components/navigation-bar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NYP Technopreneurship Club",
  description:
    "Developing an entrepreneurial mindset across the SIT student body with the application of technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className={"h-dvh flex flex-col"}>
          <NavigationBar className={"flex-none"} />
          <div className={"flex-1"}>{children}</div>
        </div>
      </body>
    </html>
  );
}