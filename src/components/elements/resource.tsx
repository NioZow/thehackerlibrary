"use client";

import {
  deleteResource,
  updateResource,
  fetchAvailableAuthorsAndTags,
  createResource,
} from "@/app/actions/resources";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { format, isValid } from "date-fns";

import {
  AlertCircle,
  X,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { IGenericData, Resource } from "@/types/prisma";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const handleDelete = async (
  resourceId: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const result = await deleteResource(resourceId);
    if (result.success) {
      setIsOpen(false);
      window.location.reload();
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.log("Error deleting resource");
  }
};

interface DeleteConfirmationDialogProps {
  isDeleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resourceId?: string;
  title?: string;
  description?: string;
}

export const DeleteConfirmationDialog = ({
  isDeleteDialogOpen,
  setDeleteDialogOpen,
  resourceId,
  title = "Delete Resource",
  description = "Are you sure you want to delete this resource? This action cannot be undone.",
}: DeleteConfirmationDialogProps) => {
  if (!isDeleteDialogOpen || !resourceId) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={() => setDeleteDialogOpen(false)}
    >
      <div
        className="bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-10 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl" />
          <button
            onClick={() => setDeleteDialogOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:rotate-90 z-10 disabled:opacity-50"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5 border border-white/20 shadow-lg">
              <AlertCircle className="w-9 h-9 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-gray-400 mt-3 text-center text-sm leading-relaxed max-w-xs">
              {description}
            </p>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-950 flex gap-3">
          <button
            onClick={() => setDeleteDialogOpen(false)}
            className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-gray-500/20 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border border-gray-700 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 via-gray-600/20 to-gray-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">Cancel</span>
          </button>
          <button
            onClick={() => handleDelete(resourceId, setDeleteDialogOpen)}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border border-red-500/30 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <>
              <AlertCircle
                size={20}
                className="group-hover:rotate-12 transition-transform duration-300 relative z-10"
              />
              <span className="relative z-10">Delete</span>
            </>
          </button>
        </div>
      </div>
    </div>
  );
};

interface EditResourceDialogProps {
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resource?: Resource;
  mode: "edit" | "create";
}

interface IResourceFormData {
  title: string;
  type: string;
  authors: string[];
  authorInput: string;
  date: Date;
  tags: string[];
  tagInput: string;
  time: string;
  url: string;
  accepted: boolean | null;
}

const defaultFormData: IResourceFormData = {
  title: "",
  type: "",
  authors: [],
  authorInput: "",
  date: new Date(),
  tags: [],
  tagInput: "",
  time: "",
  url: "",
  accepted: null,
};

export const EditResourceDialog = ({
  isDialogOpen,
  setDialogOpen,
  resource,
  mode,
}: EditResourceDialogProps) => {
  if (!isDialogOpen) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IResourceFormData>(
    resource
      ? {
          ...defaultFormData,
          title: resource.title,
          type: resource.type,
          authors: resource.authors.map((a: IGenericData) => a.name),
          date: new Date(resource.date ?? ""),
          tags: resource.tags.map((t: IGenericData) => t.name),
          time: resource.time?.toString() || "",
          url: resource.url,
          accepted: resource.accepted,
        }
      : defaultFormData,
  );

  const [authorDropdownOpen, setAuthorDropdownOpen] = useState(false);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [availableAuthors, setAvailableAuthors] = useState<IGenericData[]>([]);
  const [availableTags, setAvailableTags] = useState<IGenericData[]>([]);
  const authorDropdownRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAvailableAuthorsAndTags();
        if (result.success) {
          setAvailableAuthors(result.authors || []);
          setAvailableTags(result.tags || []);
        }
      } catch (error) {
        console.error("Error fetching authors and tags:", error);
      }
    };

    if (isDialogOpen) {
      fetchData();
    }
  }, [isDialogOpen]);

  // close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        authorDropdownRef.current &&
        !authorDropdownRef.current.contains(e.target as Node)
      ) {
        setAuthorDropdownOpen(false);
      }
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(e.target as Node)
      ) {
        setTagDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFilteredAuthors = () => {
    return availableAuthors
      .filter(
        (author) =>
          author.name
            .toLowerCase()
            .includes(formData.authorInput.toLowerCase()) &&
          !formData.authors.includes(author.name),
      )
      .slice(0, 5);
  };

  const getFilteredTags = () => {
    return availableTags
      .filter(
        (tag) =>
          tag.name.toLowerCase().includes(formData.tagInput.toLowerCase()) &&
          !formData.tags.includes(tag.name),
      )
      .slice(0, 5);
  };

  const handleAddAuthor = (authorName?: string) => {
    const name = authorName || formData.authorInput.trim();
    if (name && !formData.authors.includes(name)) {
      setFormData({
        ...formData,
        authors: [...formData.authors, name],
        authorInput: "",
      });
      setAuthorDropdownOpen(false);
    }
  };

  const handleRemoveAuthor = (index: number) => {
    setFormData({
      ...formData,
      authors: formData.authors.filter((_, i) => i !== index),
    });
  };

  const handleAddTag = (tagName?: string) => {
    const name = tagName || formData.tagInput.trim();
    if (name && !formData.tags.includes(name)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, name],
        tagInput: "",
      });
      setTagDropdownOpen(false);
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setFormData({
        ...formData,
        date: selectedDate,
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = {
        title: formData.title,
        type: formData.type,
        authors: formData.authors,
        date: formData.date,
        tags: formData.tags,
        time: formData.time ? parseInt(formData.time) : null,
        url: formData.url,
        accepted: formData.accepted,
      };

      const result =
        mode === "edit" && resource
          ? await updateResource(resource.id, data)
          : await createResource(data);

      if (result?.success) {
        toast.success(
          mode === "edit"
            ? "Resource updated successfully"
            : "Resource created successfully",
        );
        setDialogOpen(false);
        window.location.reload();
      } else {
        toast.error(result?.message || "Failed to save resource");
      }
    } catch (error) {
      toast.error("Error saving resource");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAuthors = getFilteredAuthors();
  const filteredTags = getFilteredTags();
  const hasAuthorSuggestions = filteredAuthors.length > 0;
  const hasTagSuggestions = filteredTags.length > 0;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={() => setDialogOpen(false)}
    >
      <div
        className="bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-800 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-10 text-white overflow-hidden sticky top-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <button
            onClick={() => setDialogOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:rotate-90 z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="relative">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {mode === "edit" ? "Edit Resource" : "Create Resource"}
            </h2>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-950 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all h-11"
                placeholder="Resource title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Type
              </label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Post">Post</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Authors
            </label>
            <div ref={authorDropdownRef} className="relative">
              <div className="flex gap-2 mb-3 relative">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={formData.authorInput}
                    onChange={(e) => {
                      setFormData({ ...formData, authorInput: e.target.value });
                      setAuthorDropdownOpen(true);
                    }}
                    onFocus={() => setAuthorDropdownOpen(true)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddAuthor();
                      }
                    }}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Add author name or search existing"
                  />
                  {authorDropdownOpen &&
                    formData.authorInput &&
                    hasAuthorSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                        {filteredAuthors.map((author) => (
                          <button
                            key={author.id}
                            onClick={() => handleAddAuthor(author.name)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-cyan-300 transition-colors text-sm"
                          >
                            {author.name}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
                <button
                  onClick={() => handleAddAuthor()}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.authors.map((author, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {author}
                  <button
                    onClick={() => handleRemoveAuthor(idx)}
                    className="hover:text-cyan-100 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all justify-start text-left font-normal">
                    {formData.date && isValid(formData.date)
                      ? format(formData.date, "PPP")
                      : "Pick a date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border border-gray-700">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateSelect}
                    className="rounded-md"
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Time (minutes)
              </label>
              <input
                type="number"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Tags
            </label>
            <div ref={tagDropdownRef} className="relative">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={formData.tagInput}
                    onChange={(e) => {
                      setFormData({ ...formData, tagInput: e.target.value });
                      setTagDropdownOpen(true);
                    }}
                    onFocus={() => setTagDropdownOpen(true)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddTag();
                      }
                    }}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Add tag or search existing"
                  />
                  {tagDropdownOpen &&
                    formData.tagInput &&
                    hasTagSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                        {filteredTags.map((tag) => (
                          <button
                            key={tag.id}
                            onClick={() => handleAddTag(tag.name)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-cyan-300 transition-colors text-sm"
                          >
                            {tag.name}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
                <button
                  onClick={() => handleAddTag()}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(idx)}
                    className="hover:text-cyan-100 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Review Status
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormData({ ...formData, accepted: null })}
                className={`relative overflow-hidden rounded-lg py-4 px-3 font-semibold transition-all duration-300 group flex items-center justify-center gap-2 border ${
                  formData.accepted === null
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 border-gray-500 text-white shadow-lg shadow-gray-500/20 scale-105"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 via-gray-600/20 to-gray-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Clock size={18} className="relative z-10" />
                <span className="relative z-10 text-sm">Pending</span>
              </button>

              <button
                onClick={() => setFormData({ ...formData, accepted: true })}
                className={`relative overflow-hidden rounded-lg py-4 px-3 font-semibold transition-all duration-300 group flex items-center justify-center gap-2 border ${
                  formData.accepted === true
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/20 to-emerald-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CheckCircle size={18} className="relative z-10" />
                <span className="relative z-10 text-sm">Accepted</span>
              </button>

              <button
                onClick={() => setFormData({ ...formData, accepted: false })}
                className={`relative overflow-hidden rounded-lg py-4 px-3 font-semibold transition-all duration-300 group flex items-center justify-center gap-2 border ${
                  formData.accepted === false
                    ? "bg-gradient-to-r from-red-600 to-red-700 border-red-500 text-white shadow-lg shadow-red-500/20 scale-105"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <XCircle size={18} className="relative z-10" />
                <span className="relative z-10 text-sm">Rejected</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-950 flex gap-3 border-t border-gray-800">
          <button
            onClick={() => setDialogOpen(false)}
            className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-gray-500/20 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border border-gray-700"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 via-gray-600/20 to-gray-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">Cancel</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border border-cyan-500/30 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-600/30 to-cyan-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {isLoading ? (
              <>
                <Loader2 size={20} className="relative z-10 animate-spin" />
                <span className="relative z-10">Saving...</span>
              </>
            ) : (
              <span className="relative z-10">
                {mode === "edit" ? "Save Changes" : "Create"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
