import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <Hero />
      </div>
      <FeaturedProjects />
    </main>
  );
}
