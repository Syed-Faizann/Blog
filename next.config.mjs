/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wmugw0awow.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io", // sometimes UploadThing uses this domain too
      },
    ],
  },
};

export default nextConfig;
