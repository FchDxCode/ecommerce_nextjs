"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Untuk mendukung tabel, list, dsb.
import rehypeRaw from "rehype-raw"; // Untuk render HTML dari CKEditor

const tabs = [
  { id: "deskripsi", title: "Deskripsi", icon: faInfoCircle },
];

export default function DeskripsiDetail({ product }) {
  const [activeTab, setActiveTab] = useState("deskripsi");

  return (
    <div className="mt-16 bg-white shadow-lg rounded-lg p-6 lg:p-10">
      {/* Navigasi Tab */}
      <div className="border-b border-gray-300">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 border-b-2"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className="text-lg" />
              {tab.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Konten Tab */}
      <div className="py-6 max-w-none">
        <AnimatePresence mode="wait">
          {activeTab === "deskripsi" && (
            <motion.div
              key="deskripsi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-800 space-y-4 prose prose-blue max-w-none leading-relaxed"
            >
              {/* Render Markdown dari CKEditor */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className="prose max-w-none"
              >
                {product.description}
              </ReactMarkdown>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
