"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Pagination({ pagination }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.pageCount) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`/product?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Menampilkan {pagination.page * pagination.pageSize - pagination.pageSize + 1}
          -{Math.min(pagination.page * pagination.pageSize, pagination.total)} dari {pagination.total} produk
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          {[...Array(pagination.pageCount)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-2 border rounded-md text-sm font-medium ${
                currentPage === index + 1 ? "bg-custom text-gray-500" : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={currentPage === pagination.pageCount}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
