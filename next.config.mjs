/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:5000",
  },
  images: {
    remotePatterns: [
      {
        // https://i.postimg.cc/Hk4tR1BC/logo.png
        protocol: "https",
        hostname: "i.postimg.cc",
      }
    ]
  }
};

export default nextConfig;
