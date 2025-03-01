'use client';

import { useEffect, useState } from "react";
import { getInstagramPosts } from "../../api/ApiInstagram";

export default function InstagramPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramData = async () => {
      setLoading(true);
      try {
        const postsData = await getInstagramPosts();
        setPosts(postsData);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data");
        console.error("Error:", err);
      }
      setLoading(false);
    };

    fetchInstagramData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative flex space-x-2">
          <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-green-500 rounded-full animate-bounce delay-200"></div>
          <div className="w-5 h-5 bg-purple-500 rounded-full animate-bounce delay-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <section className="pb-20 pt-10 bg-gradient-to-r from-blue-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-20 tracking-wide">
            Instagram Gallery 📸
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.length > 0 ? (
              posts.map((post, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:scale-105"
                >
                  <img
                    src={`/api/proxy?url=${encodeURIComponent(post.media_url)}`}
                    alt={post.caption || "Instagram Post"}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-center space-y-2"
                    >
                      <i className="fab fa-instagram text-5xl"></i>
                      <p className="font-semibold text-lg">Lihat di Instagram</p>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">Tidak ada postingan tersedia.</p>
            )}
          </div>

          <div className="text-center mt-12">
            <a 
              href={posts[0]?.permalink || 'https://www.instagram.com'} 
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center px-6 py-3 text-md font-bold text-gray-700 hover:text-white transition-all duration-500 border-2 border-gray-400 rounded-full overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 translate-x-full rounded-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10 flex items-center">
                <i className="fas fa-shopping-cart text-2xl mr-2 transition-transform group-hover:scale-125"></i>
                Lihat Lebih Banyak
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}