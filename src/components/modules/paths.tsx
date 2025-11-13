"use client";

import React, { useState } from "react";
import { CardTopic, ITopic } from "@/components/elements/cards";
import {
  defaultPathIconStyle,
  pathIconMappings,
} from "@/components/elements/icons";
import { Audiowide } from "next/font/google";
import Header from "@/components/elements/header";
import { Path } from "@/types/prisma";
import { AddTopicDialog } from "@/components/elements/topic";
import { Plus } from "lucide-react";
import { useAdmin } from "@/lib/useAdmin";

const font = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

interface IProps {
  path: Path;
  pathResourceCount: number;
  topics: ITopic[];
}

export function Paths({ path, pathResourceCount, topics }: IProps) {
  const icon = pathIconMappings[path.name] ?? defaultPathIconStyle;
  const isAdmin = useAdmin();
  const [isAddTopicDialogOpen, setIsAddTopicDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
      <Header fixed={true} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <div
                className={`p-4 rounded-xl bg-gradient-to-r ${icon.color} text-white mr-6`}
              >
                {icon.icon}
              </div>
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${font.className}`}>
                  {path.name.toUpperCase()}
                </h2>
                <p className="text-gray-500 mb-2">TBD Description</p>
                <span className="text-sm text-gray-500">
                  {pathResourceCount} posts available
                </span>
              </div>
            </div>
            {isAdmin ? (
              <button
                onClick={() => setIsAddTopicDialogOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border border-cyan-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-600/30 to-cyan-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Plus size={20} className="relative z-10" />
                <span className="relative z-10">Add Topic</span>
              </button>
            ) : null}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <CardTopic key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
      <AddTopicDialog
        isDialogOpen={isAddTopicDialogOpen}
        setDialogOpen={setIsAddTopicDialogOpen}
        pathId={path.id}
      />
    </div>
  );
}
