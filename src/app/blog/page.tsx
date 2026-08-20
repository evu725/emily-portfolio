import Link from "next/link";
import Nav from "@/components/Nav";
import styles from "../shared.module.css";
import blogStyles from "./Blog.module.css";
import { posts } from "./posts";

export default function BlogPage() {
  return (
    <main>
      <Nav />
      <div className={styles.content}>

        <header className={styles.header}>
          <h1 className={styles.name}>
            blog<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.tagline}>things I&rsquo;ve been thinking about</p>
        </header>

        <p className={styles.bio}>
          Notes on what I&rsquo;m building, learning, and figuring out along the way.
        </p>

        <ul className={blogStyles.postList}>
          {posts.map((post) => (
            <li key={post.slug} className={blogStyles.post}>
              <h2 className={blogStyles.postTitle}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <div className={blogStyles.postDate}>{post.date}</div>
              <p className={blogStyles.postExcerpt}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className={blogStyles.readMore}>
                read more ↗
              </Link>
            </li>
          ))}
        </ul>

        <div className={blogStyles.back}>
          <Link href="/">← back</Link>
        </div>

      </div>
    </main>
  );
}
