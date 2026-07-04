import type { NextConfig } from "next";

function normaliseBasePath(basePath?: string) {
  if (!basePath) {
    return undefined;
  }

  const trimmedPath = basePath.trim();

  if (!trimmedPath || trimmedPath === "/") {
    return undefined;
  }

  const withoutTrailingSlash = trimmedPath.replace(/\/+$/, "");

  return withoutTrailingSlash.startsWith("/")
    ? withoutTrailingSlash
    : `/${withoutTrailingSlash}`;
}

const shouldExportStaticSite = process.env.STATIC_EXPORT === "true";
const basePath = normaliseBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  ...(basePath ? { basePath } : {}),
  ...(shouldExportStaticSite
    ? {
        output: "export",
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
