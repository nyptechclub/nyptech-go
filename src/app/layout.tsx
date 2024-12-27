import { inter } from "@/fonts";
import { LayoutProps } from "@/types";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import clsx from "clsx";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYP Technopreneurship Club",
};

export default function Layout(props: LayoutProps) {
  return (
    <html lang="en">
      <body className={clsx("antialiased", inter.className)}>
        <ClerkProvider appearance={{ baseTheme: dark }}>{props.children}</ClerkProvider>
      </body>
    </html>
  );
}