import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroSlider from "@/components/home/HeroSlider";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowItWorks from "@/components/home/HowItWorks";
import StudioCategories from "@/components/home/StudioCategories";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSlider />
      <FeaturedStudios />
      <StudioCategories />
      <HowItWorks />
      <HostGuarantee />
    </div>
  );
}
