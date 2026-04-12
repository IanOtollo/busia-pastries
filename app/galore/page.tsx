import React from "react";
import { sanityFetch } from "@/lib/sanity/client";
import { AboutClient } from "./AboutClient";

export const revalidate = 3600; // Revalidate every hour

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  caption?: string;
}

export default async function AboutPage() {
  const galleryImages = await sanityFetch<GalleryImage[]>(
    `*[_type == "galleryImage"] | order(publishedAt desc, _createdAt desc) {
      _id,
      title,
      "imageUrl": coalesce(imageUrl, image.asset->url),
      caption
    }`
  );

  return <AboutClient galleryImages={galleryImages || []} />;
}
