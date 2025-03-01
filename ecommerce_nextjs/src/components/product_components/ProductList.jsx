"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "../../api/ApiProduct";
import ProductItem from "./ProductItem";
import Breadcrumbs from "../Breadcumps";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Filter from "./Filter";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 6, pageCount: 1, total: 0 });
  
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(categoryId, searchQuery, sortOption, currentPage);
      setProducts(data.products);
      setPagination(data.pagination);
    };

    getProducts();
  }, [categoryId, searchQuery, sortOption, currentPage]);

  return (
    <div>
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <Breadcrumbs />
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 mt-8">
          {/* Filter di kolom pertama */}
          <Filter />

          {/* Daftar Produk */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                {categoryId ? `Kategori ${products[0]?.categoryName || 'Tidak Ditemukan'}` : "Semua Produk"}
              </h1>
              <SearchBar />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length > 0 ? (
                products.map((product) => <ProductItem key={product.id} product={product} />)
              ) : (
                <p className="text-gray-600">Tidak ada produk yang cocok dengan pencarian.</p>
              )}
            </div>

            <Pagination pagination={pagination} />
          </div>
        </div>
      </main>
    </div>
  );
}
