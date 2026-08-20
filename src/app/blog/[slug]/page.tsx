import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import styles from "../../shared.module.css";
import blogStyles from "../Blog.module.css";
import { posts, getPostBySlug } from "../posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Nav />
      <div className={styles.content}>

        <header className={`${styles.header} ${blogStyles.postHeader}`}>
          <h1 className={styles.name}>{post.title}</h1>
          <div className={blogStyles.postDateLarge}>{post.date}</div>
        </header>

        <div className={blogStyles.postBody}>
          {post.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className={blogStyles.back}>
          <Link href="/blog">← back to blog</Link>
        </div>

      </div>
    </main>
  );
}
