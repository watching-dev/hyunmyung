/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/upload/:slug",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // Matched parameters can be used in the destination
      },
    ];
  },

  images: {
    domains: ["encrypted-tbn0.gstatic.com", "pbs.twimg.com"],
  },
};

export default nextConfig;
