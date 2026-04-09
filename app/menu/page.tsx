import React from "react";
import { MenuClient } from "@/components/menu/MenuClient";
import { client } from "@/lib/sanity/client";
import { GET_ALL_PRODUCTS } from "@/lib/sanity/queries";
import { SanityProduct } from "@/types/product";

export const revalidate = 60; // Revalidate every minute

export default async function MenuPage() {
  const products = (await client.fetch(GET_ALL_PRODUCTS)) as SanityProduct[];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <MenuClient initialProducts={products} />
      </div>
    </div>
  );
}
