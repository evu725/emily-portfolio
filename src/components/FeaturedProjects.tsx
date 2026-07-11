import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedProjects.module.css";

const projects = [
  {
    name: "Expense Tracker App",
    tags: ["full-stack", "react · express · postgres"],
    description:
      "A full-stack expense tracker with secure login sessions and a PostgreSQL-backed API for filtering, categorizing, and reporting on your spending.",
    image: "/projects/expense-tracker.png",
    live: "https://full-stack-project-remix-evu725.onrender.com",
    github: "https://github.com/The-Marcy-Lab-School-Assignments/full-stack-project-remix-evu725",
  },
  {
    name: "Artly",
    tags: ["front-end", "html · css · javascript"],
    description:
      "A lightweight art browser powered by the Art Institute of Chicago's collection, with keyword search to find and explore specific artworks.",
    image: "/projects/artly.png",
    live: "https://solea-emily-mls.github.io/mod-4-project/",
    github: "https://github.com/solea-emily-mls/mod-4-project",
  },
];

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function FeaturedProjects() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>01 — SELECTED WORKS</div>
          <div className={styles.headingRow}>
            <h2 className={styles.heading}>featured projects</h2>
            <span className={styles.headingSparkle} aria-hidden="true">✦</span>
          </div>
          <p className={styles.subtitle}>
            things I&rsquo;ve built from the ground up — full-stack, back-end, and design.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((p) => (
            <div key={p.name} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={p.image}
                  alt={`${p.name} screenshot`}
                  fill
                  sizes="(max-width: 800px) 100vw, 600px"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.tags}>
                  {p.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <h3 className={styles.title}>{p.name}</h3>
                <p className={styles.description}>{p.description}</p>
                <div className={styles.links}>
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
                    live website <span>→</span>
                  </a>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                    <GithubIcon /> github
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.seeAllWrap}>
          <Link href="/work" className={styles.seeAll}>see all projects →</Link>
        </div>
      </div>
    </section>
  );
}
