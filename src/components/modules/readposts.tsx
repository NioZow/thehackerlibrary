"use client";

import { Resource, ResourceRead } from "@/types/prisma";
import { BookOpen } from "lucide-react";
import React, { useState } from "react";
import { CardResource } from "@/components/elements/cards";

import {
  DeleteConfirmationDialog,
  EditResourceDialog,
} from "@/components/elements/resource";

function formatReadDate(date: Date): string {
  const now = new Date();
  const readDate = new Date(date);
  const diffInMs = now.getTime() - readDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    return readDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

interface IProps {
  resources: ResourceRead[];
}

export default function ReadResources({ resources }: IProps) {
  const [_, setIsSignInOpen] = useState(false);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(
    null,
  );

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Read Posts</h1>
        <p className="text-slate-400">
          {resources.length} {resources.length === 1 ? "post" : "posts"} read
        </p>
      </div>

      {resources.map((resource) => {
        const readPost = resource.readPosts?.[0];
        return (
          <div key={resource.id} className="space-y-2">
            <CardResource
              resource={resource}
              setIsSignInOpen={setIsSignInOpen}
              setDeleteDialogOpen={setDeleteDialogOpen}
              setResourceToDelete={setResourceToDelete}
              setResourceToEdit={setResourceToEdit}
              setEditDialogOpen={setEditDialogOpen}
              key={resource.id}
            />
            {readPost?.readAt && (
              <div className="ml-4 text-sm text-slate-500 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Read {formatReadDate(readPost.readAt)}</span>
              </div>
            )}
          </div>
        );
      })}

      {resources.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-slate-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No posts read yet
          </h3>
          <p className="text-slate-400 mb-4">
            Posts you mark as read will appear here
          </p>
        </div>
      )}

      <DeleteConfirmationDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        resourceId={resourceToDelete?.id}
        title="Delete Resource"
        description={`Are you sure you want to delete "${resourceToDelete?.title}"? This action cannot be undone.`}
      />

      <EditResourceDialog
        isDialogOpen={isEditDialogOpen}
        setDialogOpen={setEditDialogOpen}
        resource={resourceToEdit ?? undefined}
        mode="edit"
      />
    </div>
  );
}
