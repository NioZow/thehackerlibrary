"use client";

import { Author, Resource, Tag as PrismaTag } from "@/types/prisma";
import {
  ChevronRight,
  BookOpen,
  Users,
  Clock,
  CalendarDays,
  Tag,
  ExternalLink,
  Trash2,
  Edit,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";
import { MoreVertical, Bookmark, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  pathIconMappings,
  defaultPathIconStyle,
  TypeIcon,
} from "@/components/elements/icons";
import { Audiowide } from "next/font/google";
import Link from "next/link";
import { toggleBookmark, toggleReadPost } from "@/app/actions/profile";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useAdmin } from "@/lib/useAdmin";

const font = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export const CardPath = ({
  path,
  posts,
}: {
  path: { id: string; name: string; topicCount: number };
  posts: number;
}) => {
  const description =
    "Follow a structured sequence of posts to master this path.";
  const style = pathIconMappings[path.name] ?? defaultPathIconStyle;

  return (
    <Link href={`/path/${path.id}/`}>
      <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300"></div>

        <div className="relative space-y-4">
          <div
            className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${style.color} shadow-lg`}
          >
            {style.icon}
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {path.name}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{path.topicCount} topics</span>
              <span className="text-cyan-400">•</span>
              <span>{posts} posts</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export interface ITopic {
  id: string;
  name: string;
  sectionCount: number;
  resourceCount: number;
  difficulty: string;
}

export const CardTopic = ({ topic }: { topic: ITopic }) => {
  const router = useRouter();

  return (
    <div
      key={topic.id}
      onClick={() => router.push(`/topic/${topic.id}`)}
      className="shadow-sm hover:shadow-md bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/80 transition-all cursor-pointer hover:scale-105 hover:border-gray-600"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${font.className}`}>
          {topic.name.toUpperCase().replaceAll("-", " ")}
        </h3>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            {topic.resourceCount} posts
          </span>
          <span className="text-sm text-gray-500">
            {topic.sectionCount} sections
          </span>
        </div>
        <BookOpen className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

interface IResourceProps {
  resource: Resource;
  setIsSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResourceToDelete: React.Dispatch<React.SetStateAction<Resource | null>>;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResourceToEdit: React.Dispatch<React.SetStateAction<Resource | null>>;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardResource = ({
  resource,
  setIsSignInOpen,
  setResourceToDelete,
  setDeleteDialogOpen,
  setResourceToEdit,
  setEditDialogOpen,
}: IResourceProps) => {
  const router = useRouter();
  const [_, startTransition] = useTransition();

  const [bookmarked, setBookmarked] = useState(resource.bookmarks?.length > 0);
  const [read, setRead] = useState(resource.readPosts?.length > 0);

  const { data: session, status } = useSession();

  const isAdmin = useAdmin();

  const getActionVerb = (resourceType: string) => {
    switch (resourceType) {
      case "Video":
        return "Watch";
      default:
        return "Read";
    }
  };

  const handleBookmarkToggle = async () => {
    if (session?.user) {
      const newBookmarkedState = !bookmarked;
      setBookmarked(newBookmarkedState);

      startTransition(async () => {
        const result = await toggleBookmark(resource.id);

        if (!result.success) {
          // Revert on error
          setBookmarked(!newBookmarkedState);
          alert(result.error || "Failed to update bookmark");
        }
      });
    } else {
      setIsSignInOpen(true);
    }
  };

  const handleReadToggle = async () => {
    if (session?.user) {
      const newReadState = !read;
      setRead(newReadState);

      startTransition(async () => {
        const result = await toggleReadPost(resource.id);

        if (!result.success) {
          // Revert on error
          setRead(!newReadState);

          toast("Error", {
            description: result.error || "Failed to update read status",
          });
        }
      });
    } else {
      setIsSignInOpen(true);
    }
  };

  const dropdownId = useId();

  return (
    <article
      key={resource.id}
      className="relative shadow-sm hover:shadow-md bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/80 transition-all cursor-pointer hover:border-gray-600"
    >
      {(bookmarked || read) && (
        <div
          className={`absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] rounded-tr-2xl ${
            bookmarked && read
              ? "border-t-emerald-500"
              : read
                ? "border-t-emerald-500"
                : "border-t-cyan-500"
          }`}
        >
          {read ? (
            <CheckCircle className="absolute -top-8 -right-[-2px] h-3 w-3 text-white transform rotate-45" />
          ) : (
            <Bookmark className="absolute -top-9 -right-[2px] h-3 w-3 text-white fill-white transform rotate-45" />
          )}
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2
            className="text-xl font-semibold mb-2 hover:text-cyan-300 cursor-pointer"
            onClick={() => window.open(resource.url, "_blank")}
          >
            {resource.title}
          </h2>

           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
            <div className="flex items-center">
              <TypeIcon type={resource.type} />
              {resource.type}
            </div>
            {resource.authors.map((author: Author) => (
              <div
                className="flex items-center hover:text-cyan-300 cursor-pointer"
                key={author.id}
                onClick={() =>
                  router.push(`/search?query=author.eq:"${author.name}"`)
                }
              >
                <Users className="w-4 h-4 mr-1 text-cyan-400" />
                {author.name}
              </div>
            ))}
            {resource.time ? (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-cyan-400" />
                {resource.time}m
              </div>
            ) : null}
            {resource.date ? (
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1 text-cyan-400" />
                {resource.date?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="ml-6 flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-transparent focus:outline-none">
                <MoreVertical className="h-5 w-5 text-slate-400 hover:text-cyan-300 transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleBookmarkToggle}>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>{bookmarked ? "Remove bookmark" : "Bookmark"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReadToggle}>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>{read ? "Mark as unread" : "Mark as read"}</span>
              </DropdownMenuItem>
              {isAdmin ? (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      setResourceToEdit(resource);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setResourceToDelete(resource);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {resource.tags
            .sort((r1: { name: string }, r2: { name: string }) =>
              r1.name.toLowerCase().localeCompare(r2.name.toLowerCase()),
            )
            .map((tag: PrismaTag) => (
              <span
                key={tag.id}
                className="px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-600/50 hover:text-cyan-300 transition-colors cursor-pointer"
                onClick={() =>
                  router.push(`/search?query=tag.eq:"${tag.name}"`)
                }
              >
                <Tag className="inline h-3 w-3 mr-1" />
                {tag.name}
              </span>
            ))}
        </div>

        <button
          className="flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
          onClick={() => window.open(resource.url, "_blank")}
        >
          {getActionVerb(resource.type)}
          <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </div>
    </article>
  );
};
