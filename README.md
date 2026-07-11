# emily-portfolio

Built with Next.js (App Router) and TypeScript, styled with CSS Modules.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **CSS Modules** for component styling, Tailwind v4 wired up but mostly unused
- **next/font/google**: Playfair Display (headings/name), Hanken Grotesk (body), IBM Plex Mono (tags/labels), Caveat (handwritten accents)

## Project Structure

```
src/
  app/
    page.tsx            home (Nav + Hero + FeaturedProjects)
    work/page.tsx        project list
    about/page.tsx       about page
    writing/page.tsx     blog (not built yet — nav links to "under construction")
    globals.css          site-wide tokens, keyframes, base styles
    shared.module.css     shared page layout styles (about/work)
  components/
    Nav.tsx               site-wide nav bar
    Hero.tsx              homepage hero (name, cloud + "hi!" stickers)
    FeaturedProjects.tsx   homepage project cards
    UnderConstruction.tsx  shared "not ready yet" modal, used by nav links
                            without a real destination (play, blog)
```

`DraggableBlocks.tsx`, `SkillsCarousel.tsx`, and `ThemeToggle.tsx` are earlier
homepage widgets that aren't wired into any page right now — left in place in
case they get reused later.

## Deploying

Deployed on [Vercel](https://vercel.com) — connect the GitHub repo, Vercel
auto-detects Next.js and redeploys on every push to the main branch.
