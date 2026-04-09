import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { sanityClient } from "@/lib/sanity/client";
import { GET_FEATURED_PRODUCTS } from "@/lib/sanity/queries";
import { SanityProduct } from "@/types/product";

export const revalidate = 120; // Revalidate every 2 minutes (ISR)

export default async function Home() {
  const featuredProducts: SanityProduct[] = await sanityClient.fetch(GET_FEATURED_PRODUCTS);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TrustBar />
      <FeaturedProducts products={featuredProducts} />
      <HowItWorks />
      <ReviewsSection />
      
      {/* Call to Action Section */}
      <section className="py-24 bg-[var(--color-cta)] text-[var(--color-cta-text)] relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent)]/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center space-y-8">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
            Ready to taste the best bakes in Busia?
          </h2>
          <p className="text-[var(--color-cta-text)]/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Join thousands of happy customers and order your fresh pastries today. 
            Quality ingredients, artisanal methods, delivered to your door.
          </p>
          <div className="pt-4">
             <a href="/menu">
                <button className="h-14 px-10 bg-[var(--color-accent)] text-[var(--color-cta-text)] rounded-xl font-bold text-lg hover:bg-[var(--color-accent-hover)] transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Order From Our Menu
                </button>
             </a>
          </div>
        </div>
      </section>
    </div>
  );
}
