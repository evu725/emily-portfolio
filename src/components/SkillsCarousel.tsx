import styles from "./SkillsCarousel.module.css";

const ROW_ONE = [
  "React", "TypeScript", "Next.js", "Python", "Node.js",
  "PostgreSQL", "Express", "REST APIs", "Docker", "Git",
];

export default function SkillsCarousel() {
  const items = [...ROW_ONE, ...ROW_ONE];
  return (
    <div className={styles.carousel}>
      <div className={styles.trackWrapper}>
        <ul className={styles.track}>
          {items.map((s, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.divider}>|</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
