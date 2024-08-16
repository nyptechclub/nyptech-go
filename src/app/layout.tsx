import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYP Technopreneurship Club",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}