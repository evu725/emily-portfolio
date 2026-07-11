import Link from "next/link";
import Nav from "@/components/Nav";
import styles from "../shared.module.css";
import workStyles from "./Work.module.css";

const projects = [
  {
    name: "Expense Tracker App",
    year: "2026",
    description:
      "A full-stack expense tracker with secure login sessions and a PostgreSQL-backed API for filtering, categorizing, and reporting on your spending.",
    stack: ["React", "Express", "PostgreSQL"],
    demo: "https://full-stack-project-remix-evu725.onrender.com",
    github: "https://github.com/The-Marcy-Lab-School-Assignments/full-stack-project-remix-evu725",
  },
  {
    name: "Artly",
    year: "2026",
    description:
      "A lightweight art browser powered by the Art Institute of Chicago's collection, with keyword search to find and explore specific artworks.",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "https://solea-emily-mls.github.io/mod-4-project/",
    github: "https://github.com/solea-emily-mls/mod-4-project",
  },
];

export default function WorkPage() {
  return (
    <main>
      <Nav />
      <div className={styles.content}>

        <header className={styles.header}>
          <h1 className={styles.name}>
            work<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.tagline}>things I&rsquo;ve built</p>
        </header>

        <p className={styles.bio}>
          A collection of projects I&rsquo;ve worked on &mdash; side projects, coursework,
          and whatever I was curious about at the time. Source code is on{" "}
          <a href="https://github.com/evu725" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          for most of these.
        </p>

        <ul className={workStyles.projectList}>
          {projects.map((p) => (
            <li key={p.name} className={workStyles.project}>
              <div className={workStyles.projectTop}>
                <span className={workStyles.projectName}>{p.name}</span>
                <span className={workStyles.projectYear}>{p.year}</span>
              </div>
              <p className={workStyles.projectDesc}>{p.description}</p>
              <div className={workStyles.projectMeta}>
                <span className={workStyles.stack}>
                  {p.stack.join(" · ")}
                </span>
                <span className={workStyles.links}>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      live website ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      github ↗
                    </a>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className={workStyles.back}>
          <Link href="/">← back</Link>
        </div>

      </div>
    </main>
  );
}
