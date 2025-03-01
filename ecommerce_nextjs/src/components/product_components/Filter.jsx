"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchKategoriProducts } from "../../api/ApiKategoriProduct"; // Import API kategori

export default function Filter() {
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchKategoriProducts();
      setCategories(data);
    };

    getCategories();
  }, []);

  // Ambil kategori yang sudah terpilih dari URL
  const selectedCategory = searchParams.get("category");

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", categoryId); // Tambahkan kategori ke URL
    } else {
      params.delete("category"); // Hapus jika tidak dipilih
    }
    router.push(`/product?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 border border-gray-200">
        <h3 className="font-semibold text-xl mb-4 text-gray-800">Filter</h3>

        <div className="space-y-6">
          {/* Kategori */}
          <div>
            <h4 className="font-medium mb-3 text-gray-700">Kategori</h4>
            <div className="max-h-[200px] overflow-y-auto">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded transition">
                  <input
                    type="radio"
                    name="kategori"
                    value={category.id}
                    checked={selectedCategory == category.id}
                    onChange={() => handleFilterChange(category.id)}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{category.title}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tombol Reset Filter */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => handleFilterChange(null)}
              className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
