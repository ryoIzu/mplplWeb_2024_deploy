/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静的エクスポートを有効にする
  // 他のオプションをここに追加できます
  images: {
    unoptimized: true, // 画像最適化を行わない
  },
};

module.exports = nextConfig;
