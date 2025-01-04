import { Banner } from "@/components/home/Banner";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { PricingSection } from "@/components/home/PricingSection";
import { Specialties } from "@/components/home/Specialties";

export default function Home() {
  return (
    <>
      <Hero />
      <Specialties />
      <Features />
      <PricingSection />
      <Footer />
    </>
  );
}
