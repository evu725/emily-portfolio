import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.name}>Emily Vu</h1>
        <p className={styles.tagline}>
          Hi! I&rsquo;m a software engineer who loves building products from the ground up:
          from design and user experience to scalable back-end systems.
        </p>

        <div className={styles.ctaRow}>
          <a href="https://linkedin.com/in/emilyvuu" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>let&rsquo;s connect!</a>
          <a href="https://github.com/evu725" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>github</a>
        </div>

        <a href="#featured-projects" className={styles.scrollDown} aria-label="Scroll to featured projects">
          <svg width="16" height="44" viewBox="0 0 16 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 0v34M1 27l7 7 7-7" />
          </svg>
        </a>
      </div>

      <div className={`${styles.sparkle} ${styles.sparkleOne}`} aria-hidden="true">✦</div>
      <div className={`${styles.sparkle} ${styles.sparkleTwo}`} aria-hidden="true">✦</div>
    </section>
  );
}
