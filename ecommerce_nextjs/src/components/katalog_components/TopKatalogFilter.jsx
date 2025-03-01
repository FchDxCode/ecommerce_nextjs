"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTv,
  faPersonDress,
  faBaby,
  faPerson,
  faHeartPulse,
  faRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import { fetchKategoriKatalog } from "../../api/ApiKategoriKatalog";

const iconMap = {
  faTv: faTv,
  faPersonDress: faPersonDress,
  faBaby: faBaby,
  faPerson: faPerson,
  faHeartPulse: faHeartPulse,
};

export default function TopKatalogFilter({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const kategoriData = await fetchKategoriKatalog();
      setCategories(kategoriData);
    };

    getCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    onCategorySelect(categoryId);
  };

  const handleReset = () => {
    setActiveCategory(null);
    onCategorySelect(null);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Kategori Populer</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleReset}
          className={`!rounded-button px-4 py-2 border transition ${
            activeCategory === null 
              ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600' 
              : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-300 hover:text-gray-900'
          }`}
        >
          <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
          Semua Katalog
        </button>

        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`!rounded-button px-4 py-2 border transition ${
                activeCategory === category.id 
                  ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600' 
                  : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-300 hover:text-gray-900'
              }`}
            >
              <FontAwesomeIcon icon={iconMap[category.icon]} className="mr-2" />
              {category.title}
            </button>
          ))
        ) : (
          <p className="text-gray-500">Memuat kategori...</p>
        )}
      </div>
    </div>
  );
}
