"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchParams, useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search..." }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchTerm(query);
  }, [searchParams]);

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative max-w-2xl">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="absolute left-3 top-1/2 transform -translate-y-1/2 border-0 z-10 hover:bg-transparent focus:outline-none"
              onClick={() => {
                router.push("/docs/thlql");
              }}
            >
              <HelpCircle className="h-5 w-5 text-slate-400 hover:text-cyan-300 transition-colors" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              TheHackerLibrary uses a simple custom query language, click to
              know how to use it
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <input
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
      />

      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 border-0 z-10 hover:bg-transparent focus:outline-none"
      >
        <Search className="h-5 w-5 text-slate-400 hover:text-cyan-300 transition-colors" />
      </button>
    </div>
  );
};

export default SearchBar;
