"use client";

import Link from "next/link";
import styles from "./Nav.module.css";
import { useUnderConstruction } from "./UnderConstruction";

export default function Nav() {
  const { open } = useUnderConstruction();

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logoWrap} aria-label="Emily Vu — home">
          <div className={styles.logo}>✦</div>
          <div className={styles.logoSparkle}>✦</div>
          <div className={styles.logoDot}></div>
        </Link>

        <ul className={styles.navLinks}>
          <li><Link href="/work">work</Link></li>
          <li><button type="button" onClick={() => open("play")}>play</button></li>
          <li><button type="button" onClick={() => open("blog")}>blog</button></li>
          <li><Link href="/about">about</Link></li>
        </ul>
      </div>
    </nav>
  );
}
