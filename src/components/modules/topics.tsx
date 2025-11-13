"use client";

import React, { useState } from "react";

import { Audiowide } from "next/font/google";

import { CardResource } from "@/components/elements/cards";
import {
  defaultPathIconStyle,
  pathIconMappings,
} from "@/components/elements/icons";
import Header from "@/components/elements/header";
import { Resource, Topic } from "@/types/prisma";
import SignInPopup from "../elements/signin";

import {
  DeleteConfirmationDialog,
  EditResourceDialog,
} from "@/components/elements/resource";
import { useAdmin } from "@/lib/useAdmin";
import { Plus } from "lucide-react";
import { AddSectionDialog } from "../elements/section";

const font = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

interface IProps {
  topic: Topic;
}

export function Topics({ topic }: IProps) {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const icon = pathIconMappings[topic.path.name] ?? defaultPathIconStyle;

  const totalNumberOfPosts =
    topic.tag.resources.length +
    topic.sections
      .filter((section) => section.tag !== null)
      .map((section) => section.tag!.resources.length)
      .reduce((acc, current) => acc + current, 0);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(
    null,
  );

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);

  const isAdmin = useAdmin();
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header fixed={true} />

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${icon.color} text-white mr-4`}
              >
                {icon.icon}
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${font.className}`}>
                  {topic.tag.name.toUpperCase().replaceAll("-", " ")}
                </h1>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-600/50 transition-colors cursor-pointer">
                    {totalNumberOfPosts} posts
                  </span>
                </div>
              </div>
            </div>
            {isAdmin ? (
              <button
                onClick={() => setIsAddSectionDialogOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border border-cyan-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-600/30 to-cyan-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Plus size={20} className="relative z-10" />
                <span className="relative z-10">Add Section</span>
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6">
          {topic.tag.resources.map((resource: Resource) => (
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

        {topic.sections.map((section) => (
          <div className="my-8" key={section.id}>
            <div className="flex items-center mb-4">
              <div>
                <h1 className={`text-3xl font-bold ${font.className}`}>
                  {section.tag!.name.toUpperCase()}
                </h1>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-600/50 transition-colors cursor-pointer">
                    {section.tag!.resources.length} posts
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {section.tag!.resources.map((resource: Resource) => (
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
          </div>
        ))}
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

      <AddSectionDialog
        isDialogOpen={isAddSectionDialogOpen}
        setDialogOpen={setIsAddSectionDialogOpen}
        topicId={topic.id}
      />
    </div>
  );
}
