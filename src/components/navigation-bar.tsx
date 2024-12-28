"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import clsx from "clsx";
import { FileIcon, HomeIcon, KeyRoundIcon, MenuIcon, PaperclipIcon } from "lucide-react";
import Link from "next/link";

const links = [
  {
    name: "Links",
    url: "/manage",
    icon: PaperclipIcon,
  },
  {
    name: "Files",
    url: "/manage/files",
    icon: FileIcon,
  },
];

export default function NavigationBar(props: { className?: string }) {
  return (
    <nav className={clsx("navbar z-20 bg-base-300 shadow-xl", props.className)}>
      <div className={"navbar-start"}>
        <div className={"dropdown md:hidden"}>
          <button className={"btn btn-ghost"} type={"button"}>
            <MenuIcon />
          </button>
          <ul className={"menu dropdown-content z-50 rounded-lg bg-base-200 shadow-lg"}>
            <li>
              <Link className={"menu-item"} href={"/"}>
                <HomeIcon />
                <span>Home</span>
              </Link>
            </li>
            <SignedIn>
              {links.map((link) => (
                <li key={link.url}>
                  <Link className={"menu-item"} href={link.url}>
                    <link.icon />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </SignedIn>
          </ul>
        </div>
        <div className={"tooltip tooltip-right"} data-tip={"Home"}>
          <Link className={"btn btn-ghost max-md:hidden"} href={"/"}>
            <HomeIcon />
          </Link>
        </div>
      </div>
      <div className={"navbar-center"}>
        <div className={"md:hidden"}>
          <span className={"font-bold"}>NYP Technopreneurship Club</span>
        </div>
        <div className={"max-md:hidden"}>
          <SignedIn>
            {links.map((link) => (
              <Link key={link.url} className={"btn btn-ghost"} href={link.url}>
                <link.icon />
                <span>{link.name}</span>
              </Link>
            ))}
          </SignedIn>
        </div>
      </div>
      <div className={"navbar-end"}>
        <SignedIn>
          <div className={"mr-2 flex items-center"}>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className={"tooltip tooltip-left"} data-tip={"Sign In"}>
            <Link className={"btn btn-ghost"} href={"/auth"}>
              <KeyRoundIcon />
            </Link>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}