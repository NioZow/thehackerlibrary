"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { constructParams, getPageNumber } from "@/utils/page";
import { RESOURCE_PER_PAGE } from "@/constants/resource";

interface IProps {
  resourcesCount: number;
  pageRoute: string;
}

export default function SwitchPage({
  resourcesCount,
  pageRoute: pageName,
}: IProps) {
  const router = useRouter();

  const pageNumber = getPageNumber(useSearchParams().get("page"));
  const query = useSearchParams().get("query") || undefined;
  const review = useSearchParams().get("review") || undefined;

  const numberOfPages =
    resourcesCount === 0
      ? Math.trunc(resourcesCount / RESOURCE_PER_PAGE)
      : Math.trunc(resourcesCount / RESOURCE_PER_PAGE) + 1;

  const switchPage = (page: number) => {
    const params = constructParams(page, query, review);
    router.push(`${pageName}?${params}`);
  };

  const handlePrevious = () => {
    switchPage(pageNumber - 1);
  };

  const handleNext = () => {
    switchPage(pageNumber + 1);
  };

  return (
    <div className="flex items-center justify-end w-full">
      <div className="flex items-center gap-2 ">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={pageNumber === 0}
          className="flex items-center gap-2 bg-neutral-900 shadow-sm hover:shadow-md bg-gray-800/50 backdrop-blur border p-6 border-gray-700 rounded-lg hover:bg-gray-800/80 transition-all cursor-pointer hover:border-gray-600"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={handleNext}
          className="flex items-center gap-2 bg-neutral-900 shadow-sm hover:shadow-md bg-gray-800/50 backdrop-blur border p-6 border-gray-700 rounded-lg hover:bg-gray-800/80 transition-all cursor-pointer hover:border-gray-600"
          disabled={pageNumber >= numberOfPages - 1}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
