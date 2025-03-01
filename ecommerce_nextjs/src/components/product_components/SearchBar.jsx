"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    router.push(`/product?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`/product?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md text-gray-700"
            placeholder="Cari produk..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon className="text-gray-400" icon={faSearch} />
          </div>
        </div>
        <select
          className="pl-3 pr-8 py-2 text-gray-700 border border-gray-400 rounded-md focus:ring-2"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Urutkan</option>
          <option value="newest">Terbaru</option>
          <option value="highest">Harga Tertinggi</option>
          <option value="lowest">Harga Terendah</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
        <button type="submit" className="lg:hidden bg-custom text-white px-4 py-2 rounded-md">
          <i className="fas fa-filter mr-2"></i>Filter
        </button>
      </div>
    </form>
  );
}
