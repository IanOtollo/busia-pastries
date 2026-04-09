import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { CustomOrderBanner } from "@/components/home/CustomOrderBanner";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <HowItWorks />
      {/* @ts-expect-error Server Component */}
      <ReviewsSection />
      <CustomOrderBanner />
    </div>
  );
}
