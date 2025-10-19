"use client";

import { Resource } from "@/types/prisma";
import { Bookmark } from "lucide-react";
import React, { useState, useEffect } from "react";
import { CardResource } from "../elements/cards";

import {
  DeleteConfirmationDialog,
  EditResourceDialog,
} from "@/components/elements/resource";

interface IProps {
  resources: Resource[];
}

export default function BookmarkedResources({ resources }: IProps) {
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
        <h1 className="text-3xl font-bold text-white mb-2">Your Bookmarks</h1>
        <p className="text-slate-400">
          {resources.length} {resources.length === 1 ? "post" : "posts"} saved
        </p>
      </div>

      {resources.map((resource) => (
        <CardResource
          resource={resource}
          setIsSignInOpen={setIsSignInOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setResourceToDelete={setResourceToDelete}
          setResourceToEdit={setResourceToEdit}
          setEditDialogOpen={setEditDialogOpen}
          key={resource.id}
        />
      ))}

      {resources.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Bookmark className="h-12 w-12 text-slate-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No bookmarks yet
          </h3>
          <p className="text-slate-400 mb-4">
            Start bookmarking posts to save them for later
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
