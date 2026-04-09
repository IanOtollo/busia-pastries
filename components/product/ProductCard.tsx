"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPrice } from "@/lib/utils/currency";
import { useCart } from "@/hooks/useCart";
import { SanityProduct } from "@/types/product";
import { cn } from "@/lib/utils/cn";

interface ProductCardProps {
  product: SanityProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { currency, rate } = useCurrency();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      sanityId: product._id,
      productName: product.name,
      unitPriceKes: product.priceKes,
      quantity: 1,
      imageUrl: product.mainImage?.asset.url,
      slug: product.slug,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={cn(
        "group relative flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl",
        !product.inStock && "opacity-80"
      )}
    >
      {/* Badge: Seasonal or Out of Stock */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {!product.inStock && (
          <Badge variant="danger" className="backdrop-blur-sm bg-rose-500/90 text-white">Out of Stock</Badge>
        )}
        {product.isFeatured && product.inStock && (
          <Badge variant="accent">Highly Loved</Badge>
        )}
      </div>

      {/* Image Wrapper */}
      <Link href={`/menu/${product.slug}`} className="relative aspect-square overflow-hidden bg-white/50">
        <Image
          src={product.mainImage?.asset.url || "/placeholder-pastry.jpg"}
          alt={product.mainImage?.alt || product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-110",
            !product.inStock && "grayscale"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
           <div className="p-3 bg-white text-[var(--color-text)] rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             <Eye className="w-5 h-5" />
           </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="space-y-1">
          <Link href={`/menu/${product.slug}`}>
            <h3 className="font-display text-xl font-bold text-[var(--color-text)] leading-tight hover:text-[var(--color-accent)] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-wider">
            {product.category}
          </p>
        </div>

        <p className="text-sm text-[var(--color-muted)] line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="pt-2 mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-mono font-bold text-[var(--color-text)]">
              {formatPrice(product.priceKes, currency, rate)}
            </span>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="rounded-full w-10 h-10 p-0"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
