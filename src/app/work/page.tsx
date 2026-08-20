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
    name: "Branch",
    year: "2026",
    description:
      "A community-building app that helps people discover local events, RSVP, and verify attendance in person via QR check-in, with AI-powered event matchmaking and per-neighborhood leaderboards.",
    stack: ["Python", "FastAPI", "PostgreSQL/PostGIS", "React"],
    demo: "https://branch-ql0d.onrender.com",
    github: "https://github.com/C-Z-G-E-Team-5-AI-Applied-Residency/Branch-Community-Builder",
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
          A collection of projects I&rsquo;ve worked on: side projects, coursework,
          and whatever I was curious about at the time.
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
