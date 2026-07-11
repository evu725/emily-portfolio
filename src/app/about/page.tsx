import Nav from "@/components/Nav";
import styles from "../shared.module.css";

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <div className={styles.content}>

        <header className={styles.header}>
          <h1 className={styles.name}>
            about<span className={styles.dot}>.</span>
          </h1>
        </header>

        <p className={styles.bio}>
          Hey! I&rsquo;m Emily, a software engineer based in NYC, currently a Fellow
          at <a href="https://www.marcylabschool.org" target="_blank" rel="noopener noreferrer">The Marcy Lab School</a>.
          I love building full-stack products with clean, intuitive interfaces and a focus on creating
          software people genuinely enjoy using. Always learning, always
          building something. Interested in software engineering, full-stack development,
          and backend engineering roles.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>recently</h2>
          <ul className={styles.list}>
            <li>finishing up my Software Engineer Fellowship at The Marcy Lab School</li>
            <li>open to entry-level & new-grad opportunities &mdash;{" "}
              <a href="mailto:evu725@gmail.com">reach out!</a>
            </li>
            <li>see what I&rsquo;ve been <a href="/work">building →</a></li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>currently</h2>
          <p className={styles.currentItem}>
            <span className={styles.currentLabel}>reading</span>
            Mistborn - Brandon Sanders
          </p>
          <p className={styles.currentItem}>
            <span className={styles.currentLabel}>listening to</span>
            505 - Arctic Monkeys
          </p>
          <p className={styles.currentItem}>
            <span className={styles.currentLabel}>learning</span>
            typescript, system design, recommendation systems
          </p>
        </section>

        <footer className={styles.footer}>
          <a href="mailto:evu725@gmail.com">email</a>
          <span className={styles.divider}>·</span>
          <a href="https://github.com/evu725" target="_blank" rel="noopener noreferrer">github</a>
          <span className={styles.divider}>·</span>
          <a href="https://linkedin.com/in/emilyvuu" target="_blank" rel="noopener noreferrer">linkedin</a>
        </footer>

      </div>
    </main>
  );
}
