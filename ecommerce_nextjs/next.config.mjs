/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader', // Menangani file .md agar tidak error
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Menghindari error terkait module Node.js yang tidak ada di browser
    };

    return config;
  },
  experimental: {
    appDir: true, // Pastikan App Router tetap aktif
  },
};

export default nextConfig;
