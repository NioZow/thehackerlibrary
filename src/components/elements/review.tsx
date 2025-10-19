"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface ReviewStatusFilterProps {
  currentReview: string;
  resourcesCount: number;
}

export default function ReviewStatusFilter({
  currentReview,
  resourcesCount,
}: ReviewStatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleReviewChange = (review: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("review", review);
    params.set("page", "0");
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-3">
        Review Status ({resourcesCount} {currentReview} resources)
      </label>
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleReviewChange("pending")}
          className={`relative overflow-hidden rounded-lg py-4 px-3 font-semibold transition-all duration-300 group flex items-center justify-center gap-2 border ${
            currentReview === "pending"
              ? "bg-gradient-to-r from-gray-600 to-gray-700 border-gray-500 text-white shadow-lg shadow-gray-500/20 scale-105"
              : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 via-gray-600/20 to-gray-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Clock size={18} className="relative z-10" />
          <span className="relative z-10 text-sm">Pending</span>
        </button>

        <button
          onClick={() => handleReviewChange("accepted")}
          className={`relative overflow-hidden rounded-lg py-4 px-3 font-semibold transition-all duration-300 group flex items-center justify-center gap-2 border ${
            currentReview === "accepted"
              ? "bg-gradient-to-r from-emerald-600 to-emerald-700 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105"
              : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/20 to-emerald-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CheckCircle size={18} className="relative z-10" />
          <span className="relative z-10 text-sm">Accepted</span>
        </button>

        <button
          onClick={() => handleReviewChange("rejected")}
          className={`relative overflow-hidden rounded-lg py-4 px-3 font-semibold transition-all duration-300 group flex items-center justify-center gap-2 border ${
            currentReview === "rejected"
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
  );
}
