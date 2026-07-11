import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.name}>Emily Vu</h1>
        <p className={styles.tagline}>
          Hi! I&rsquo;m a software engineer who loves building products from the ground up
          &mdash; from design and user experience to scalable back-end systems.
        </p>
        <p className={styles.credentials}>
          SWE Fellow @ The Marcy Lab School&nbsp;&nbsp;
        </p>
      </div>

      <div className={styles.cloud} aria-hidden="true">
        <div className={styles.cloudBody}>
          <div className={`${styles.cloudPart} ${styles.cloudOutline1}`}></div>
          <div className={`${styles.cloudPart} ${styles.cloudOutline2}`}></div>
          <div className={`${styles.cloudPart} ${styles.cloudOutline3}`}></div>
          <div className={`${styles.cloudPart} ${styles.cloudOutlineBase}`}></div>
          <div className={`${styles.cloudPart} ${styles.cloudFill1}`}></div>
          <div className={`${styles.cloudPart} ${styles.cloudFill2}`}></div>
          <div className={`${styles.cloudPart} ${styles.cloudFill3}`}></div>
          <div className={`${styles.cloudPart} ${styles.cloudFillBase}`}></div>
          <div className={styles.cloudFace}>
            <div className={styles.cloudEyes}>
              <span></span>
              <span></span>
            </div>
            <div className={styles.cloudSmile}></div>
          </div>
          <div className={`${styles.cloudBlush} ${styles.cloudBlushLeft}`}></div>
          <div className={`${styles.cloudBlush} ${styles.cloudBlushRight}`}></div>
        </div>
      </div>

      <div className={styles.bubble} aria-hidden="true">
        <div className={styles.bubbleCard}>
          <div className={styles.bubbleText}>hi!</div>
          <div className={styles.bubbleTail}></div>
        </div>
      </div>

      <div className={`${styles.sparkle} ${styles.sparkleOne}`} aria-hidden="true">✦</div>
      <div className={`${styles.sparkle} ${styles.sparkleTwo}`} aria-hidden="true">✦</div>
    </section>
  );
}
