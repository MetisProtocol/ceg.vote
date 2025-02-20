import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://ceg.vote",
      images: "/banner.jpg",
      siteName: "CEG.vote",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@MetisGovernance",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/banner.jpg",
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development" || !process.env.NEXT_PUBLIC_SITE_URL
    ? new URL("http://localhost:3000")
    : new URL(`https://ceg.vote`);
