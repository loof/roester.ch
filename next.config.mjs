/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/next-roast",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
