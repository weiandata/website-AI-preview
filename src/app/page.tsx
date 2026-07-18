import { CategoryExplorer } from "@/components/home/category-explorer";
import { DiscoverySearch } from "@/components/home/discovery-search";
import { FeaturedSkills } from "@/components/home/featured-skills";
import { Hero } from "@/components/home/hero";
import { RecentSkills } from "@/components/home/recent-skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <DiscoverySearch />
      <FeaturedSkills />
      <div className="container-shell section-space">
        <CategoryExplorer />
      </div>
      <div className="container-shell section-space">
        <RecentSkills />
      </div>
    </main>
  );
}
