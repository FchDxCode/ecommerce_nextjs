export default function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="mt-10">
      <div className="flex items-center space-x-2 text-gray-500 px-4 py-3 rounded-lg">
        {/* Beranda */}
        <a href="/landing">
          <span className="hover:text-blue-600 text-sm font-medium cursor-pointer">
            Beranda
          </span>
        </a>
        
        <svg
          className="h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>

        {/* Semua Produk */}
        <span className="text-gray-900 text-sm font-medium">
          Semua Produk
        </span>
      </div>
    </nav>
  );
}
