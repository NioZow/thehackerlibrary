"use client";

import { IGenericData } from "@/types/prisma";
import { useEffect, useRef, useState } from "react";
import { fetchAvailableTags } from "@/app/actions/resources";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { createSection } from "@/app/actions/section";

interface ISectionFormData {
  priority: number;
  tag: string;
  tagInput: string;
}

interface AddSectionDialogProps {
  isDialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  topicId: string;
}

export const AddSectionDialog = ({
  isDialogOpen,
  setDialogOpen,
  topicId,
}: AddSectionDialogProps) => {
  if (!isDialogOpen) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ISectionFormData>({
    priority: 0,
    tag: "",
    tagInput: "",
  });
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [availableTags, setAvailableTags] = useState<IGenericData[]>([]);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAvailableTags();
        if (result.success) {
          setAvailableTags(result.tags || []);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    if (isDialogOpen) {
      fetchData();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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

  const getFilteredTags = () => {
    return availableTags
      .filter(
        (tag) =>
          tag.name.toLowerCase().includes(formData.tagInput.toLowerCase()) &&
          formData.tag !== tag.name,
      )
      .slice(0, 5);
  };

  const handleAddTag = (tagName?: string) => {
    const name = tagName || formData.tagInput.trim();
    if (name) {
      setFormData({
        ...formData,
        tag: name,
        tagInput: "",
      });
      setTagDropdownOpen(false);
    }
  };

  const handleSave = async () => {
    if (!formData.tag) {
      toast.error("Please select a tag");
      return;
    }

    setIsLoading(true);
    try {
      const selectedTag = availableTags.find((tag) => tag.name == formData.tag);
      if (!selectedTag) {
        toast.error("Invalid tag.");
        setDialogOpen(false);
        return;
      }

      const data = {
        tag_id: selectedTag.id,
        priority: formData.priority,
        topic_id: topicId,
      };

      const result = await createSection(data);

      if (result?.success) {
        toast.success("Section created successfully");
        setDialogOpen(false);
        window.location.reload();
      } else {
        toast.error(result?.message || "Failed to create section");
      }
    } catch (error) {
      toast.error("Error creating section");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTags = getFilteredTags();
  const hasTagSuggestions = filteredTags.length > 0;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={() => setDialogOpen(false)}
    >
      <div
        className="bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-800 max-h-[90vh] overflow-y-auto"
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
              Add Section
            </h2>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-950 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Priority
            </label>
            <input
              type="number"
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: parseInt(e.target.value) || 0,
                })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Tag
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
                    placeholder="Search or add tag"
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
                  Select
                </button>
              </div>
            </div>
            {formData.tag && (
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg text-sm font-medium flex items-center gap-2">
                  {formData.tag}
                  <button
                    onClick={() =>
                      setFormData({ ...formData, tag: "", tagInput: "" })
                    }
                    className="hover:text-cyan-100 transition-colors"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}
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
                <span className="relative z-10">Creating...</span>
              </>
            ) : (
              <span className="relative z-10">Create Section</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
