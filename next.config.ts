import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn.sanity.io",
      "d2bd5h5te3s67r.cloudfront.net",
      "s3-us-west-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
