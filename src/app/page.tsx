import { CategoryExplorer } from "@/components/home/category-explorer";
import { ContributionSection } from "@/components/home/contribution-section";
import { FeaturedSkills } from "@/components/home/featured-skills";
import { Hero } from "@/components/home/hero";
import { PlatformValues } from "@/components/home/platform-values";
import { RecentSkills } from "@/components/home/recent-skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSkills />
      <div className="container-shell section-space">
        <CategoryExplorer />
      </div>
      <div className="container-shell section-space">
        <PlatformValues />
      </div>
      <div className="container-shell section-space">
        <RecentSkills />
      </div>
      <ContributionSection />
    </main>
  );
}
