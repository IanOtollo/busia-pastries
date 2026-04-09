import { createClient } from "@sanity/client";

/**
 * Sanity Client Configuration
 * Strictly adheres to the "Zero Mock Data" policy.
 * If credentials are missing, the app will handle empty data states gracefully.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-03-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

/**
 * Fetch helper with error handling
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T | []> {
  // If we're missing credentials, return empty array to trigger specify empty state UI
  if (projectId === "missing-project-id") {
    console.warn("Sanity Project ID is missing. Returning empty state.");
    return [] as unknown as T;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
        tags,
      },
    });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [] as unknown as T;
  }
}
