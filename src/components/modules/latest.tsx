"use client";

import Header from "@/components/elements/header";
import { Path, Resource } from "@/types/prisma";
import { CardResource } from "@/components/elements/cards";
import { SelectPath } from "@/components/elements/selectPath";
import SignInPopup from "../elements/signin";
import { useState } from "react";

import {
  DeleteConfirmationDialog,
  EditResourceDialog,
} from "@/components/elements/resource";

interface IProps {
  resources: Resource[];
  paths: Path[];
  path: Path | null;
}

export default function Latest({ resources, paths, path }: IProps) {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(
    null,
  );

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      <Header fixed={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
            <SelectPath
              paths={paths}
              path={path}
              storageName="latestPath"
              page="latest"
            />
          </div>

          {resources.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
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
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Post Found
                </h3>
                <p className="text-slate-400">
                  We couldn't find latest posts for this path. Try selecting a
                  different path or check back later.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <SignInPopup
        isOpen={isSignInOpen}
        setIsOpen={setIsSignInOpen}
        message="Sign in to bookmark and mark posts as read"
      />

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
