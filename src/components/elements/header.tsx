"use client";

import * as React from "react";
import {
  Bell,
  Bookmark,
  CheckCircle,
  Github,
  LogOut,
  User,
  ScanEye,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import SignInPopup from "@/components/elements/signin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdmin } from "@/lib/useAdmin";
import { MdArticle } from "react-icons/md";

export default function Header({ fixed }: { fixed: boolean }) {
  const notifications = [];
  const [dailyPath, setDailyPath] = useState<number | null>(null);
  const [latestPath, setLatestPath] = useState<number | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const isAdmin = useAdmin();

  const { data: session, status } = useSession();

  const pages = [
    {
      link: "/search",
      label: "Search",
    },
    {
      link: "/path",
      label: "Learning Paths",
    },
    {
      link: "/latest" + (latestPath ? `?path=${latestPath}` : ""),
      label: "Latest Posts",
    },
    {
      link: "/daily" + (dailyPath ? `?path=${dailyPath}` : ""),
      label: "Post of the Day",
    },
  ];

  useEffect(() => {
    const dailyPathString = localStorage.getItem("dailyPath");
    setDailyPath(dailyPathString ? Number(dailyPathString) : null);

    const latestPathString = localStorage.getItem("latestPath");
    setLatestPath(latestPathString ? Number(latestPathString) : null);
  }, []);

  const handleUserIconClick = () => {
    if (status === "unauthenticated") {
      setIsSignInOpen(true);
    }
  };

  return (
    <>
      <header
        className={cn(
          "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg border-b border-cyan-500/20 backdrop-blur-sm",
          fixed ? "fixed top-0 left-0 right-0 z-50" : "",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center group">
              <div className="relative">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="The Hacker Library Logo"
                    width={40}
                    height={40}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="relative">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                      The Hacker Library
                    </h1>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex space-x-2">
              {pages.map((page) => {
                return (
                  <Link
                    key={page.link}
                    href={page.link}
                    className="relative px-4 py-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 rounded-lg hover:bg-cyan-500/10 group"
                  >
                    <span className="relative z-10">{page.label}</span>
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/niozow/thehackerlibrary"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 group"
              >
                <Github className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 group-hover:scale-110" />
                <span className="absolute inset-0 rounded-lg bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-colors duration-300"></span>
              </a>

              <button
                onClick={handleUserIconClick}
                className="relative p-2 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 group"
              >
                <Bell className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 group-hover:scale-110" />
                {notifications.length > 0 ? (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {notifications.length}
                  </span>
                ) : null}
              </button>

              {status === "authenticated" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 group">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={session?.user?.image || undefined}
                          alt={session?.user?.name || "User"}
                        />
                        <AvatarFallback className="bg-transparent">
                          <User className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 group-hover:scale-110" />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link
                        href="/profile/bookmarks"
                        className="flex items-center"
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Bookmarks</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile/read" className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Read posts</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin ? (
                      <DropdownMenuItem>
                        <Link href="/admin" className="flex items-center">
                          <ScanEye className="mr-2 h-4 w-4" />
                          <span>Admin</span>
                        </Link>
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={handleUserIconClick}
                  className="relative p-2 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 group"
                >
                  <User className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 group-hover:scale-110" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <SignInPopup isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
    </>
  );
}
