import { CategoryExplorer } from "@/components/home/category-explorer";
import { DiscoverySearch } from "@/components/home/discovery-search";
import { FeaturedSkills } from "@/components/home/featured-skills";
import { Hero } from "@/components/home/hero";
import { RecentSkills } from "@/components/home/recent-skills";
import { getPublishedSkills } from "@/lib/skills/repository";

export default async function Home() {
  const skills = await getPublishedSkills();
  return (
    <main>
      <Hero />
      <DiscoverySearch skills={skills} />
      <FeaturedSkills skills={skills} />
      <div className="container-shell section-space">
        <CategoryExplorer skills={skills} />
      </div>
      <div className="container-shell section-space">
        <RecentSkills skills={skills} />
      </div>
    </main>
  );
}
