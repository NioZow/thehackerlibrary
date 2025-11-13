"use client";
import SearchBar from "@/components/elements/searchbar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Resource } from "@/types/prisma";
import { useRouter } from "next/navigation";
import React from "react";
import { Search, Plus } from "lucide-react";
import { CardResource } from "../elements/cards";
import SignInPopup from "@/components/elements/signin";
import {
  DeleteConfirmationDialog,
  EditResourceDialog,
} from "@/components/elements/resource";
import { useAdmin } from "@/lib/useAdmin";

interface IProps {
  resources: Resource[];
  invalidQuery: boolean;
}

export default function SearchResources({ resources, invalidQuery }: IProps) {
  const router = useRouter();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(
    null,
  );
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);

  const onSearch = (text: string) => {
    if (text) {
      router.push(`/search?query=${text}`);
    } else {
      router.push("/search");
    }
  };

  const isAdmin = useAdmin();

  useEffect(() => {
    if (invalidQuery) {
      const timer = setTimeout(() => {
        toast("Invalid query", {
          description: "The query you made does not follow the ThlQL syntax.",
          action: {
            label: "See docs",
            onClick: () => router.push("/docs/thlql"),
          },
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [invalidQuery]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 space-y-6">
         <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="flex-1">
            <SearchBar onSearch={onSearch} />
          </div>
          {isAdmin ? (
            <button
              onClick={() => setCreateDialogOpen(true)}
               className="w-full sm:w-auto px-4 py-3 bg-slate-800/50 border border-gray-700 rounded-xl text-white hover:border-gray-600 hover:bg-slate-800/70 transition-all duration-200 font-medium flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:text-cyan-300"
              title="Add a new resource"
            >
              <Plus className="h-5 w-5" />
              Add
            </button>
          ) : null}
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
      </div>
      {resources.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-slate-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No posts found
          </h3>
          <p className="text-slate-400 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => router.push("/search")}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
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
      <EditResourceDialog
        isDialogOpen={isCreateDialogOpen}
        setDialogOpen={setCreateDialogOpen}
        mode="create"
      />
    </>
  );
}
