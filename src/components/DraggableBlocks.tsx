"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./DraggableBlocks.module.css";

const GRAVITY    = 0.38;
const DAMPING    = 0.52;
const FRICTION   = 0.97;
const RESTITUTION = 0.6;
const PASSES     = 3; // collision resolution iterations per frame

type ShapeType = "circle" | "rect" | "triangle";

type Shape = {
  id: number;
  type: ShapeType;
  color: string;
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

// collision radius — treat every shape as a circle for simplicity
function radius(s: Shape) {
  return (s.w + s.h) / 4;
}

const INITIAL: Shape[] = [
  { id: 0,  type: "circle",   color: "#a389f7", w: 62,  h: 62,  x: 5,   y: 5,   vx: 0, vy: 0 },
  { id: 1,  type: "rect",     color: "#e879f9", w: 74,  h: 50,  x: 105, y: 5,   vx: 0, vy: 0 },
  { id: 2,  type: "triangle", color: "#67e8f9", w: 66,  h: 58,  x: 220, y: 5,   vx: 0, vy: 0 },
  { id: 3,  type: "circle",   color: "#fbbf24", w: 54,  h: 54,  x: 325, y: 5,   vx: 0, vy: 0 },
  { id: 4,  type: "rect",     color: "#7b5cf5", w: 58,  h: 74,  x: 420, y: 5,   vx: 0, vy: 0 },
  { id: 5,  type: "triangle", color: "#f472b6", w: 70,  h: 62,  x: 520, y: 5,   vx: 0, vy: 0 },
  { id: 6,  type: "circle",   color: "#34d399", w: 66,  h: 66,  x: 30,  y: 140, vx: 0, vy: 0 },
  { id: 7,  type: "rect",     color: "#fb923c", w: 54,  h: 54,  x: 145, y: 140, vx: 0, vy: 0 },
  { id: 8,  type: "triangle", color: "#a389f7", w: 62,  h: 54,  x: 250, y: 140, vx: 0, vy: 0 },
  { id: 9,  type: "circle",   color: "#e879f9", w: 50,  h: 50,  x: 360, y: 140, vx: 0, vy: 0 },
  { id: 10, type: "rect",     color: "#67e8f9", w: 72,  h: 44,  x: 455, y: 140, vx: 0, vy: 0 },
  { id: 11, type: "circle",   color: "#fbbf24", w: 46,  h: 46,  x: 570, y: 140, vx: 0, vy: 0 },
];

function ShapeEl({ type, color, w, h }: Pick<Shape, "type" | "color" | "w" | "h">) {
  const base: React.CSSProperties = { width: w, height: h, opacity: 0.88 };
  if (type === "circle")
    return <div style={{ ...base, borderRadius: "50%", background: color }} />;
  if (type === "rect")
    return <div style={{ ...base, borderRadius: 5, background: color }} />;
  return <div style={{ ...base, background: color, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />;
}

export default function DraggableBlocks() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const physicsRef    = useRef<Shape[]>(INITIAL.map(s => ({ ...s })));
  const rafRef        = useRef<number>(0);
  const draggingId    = useRef<number | null>(null);
  const dragOffset    = useRef({ x: 0, y: 0 });
  const mouseHistory  = useRef<{ x: number; y: number; t: number }[]>([]);
  const containerSize = useRef({ w: 660, h: 240 });

  const [shapes, setShapes]     = useState<Shape[]>(INITIAL);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const { w: cw, h: ch } = containerSize.current;
      const arr = physicsRef.current;

      // 1. gravity + integrate
      for (const s of arr) {
        if (s.id === draggingId.current) continue;
        s.vy += GRAVITY;
        s.x  += s.vx;
        s.y  += s.vy;

        // walls
        if (s.y + s.h >= ch) { s.y = ch - s.h; s.vy = -Math.abs(s.vy) * DAMPING; s.vx *= FRICTION; if (Math.abs(s.vy) < 0.4) s.vy = 0; }
        if (s.y < 0)          { s.y = 0;        s.vy =  Math.abs(s.vy) * DAMPING; }
        if (s.x < 0)          { s.x = 0;        s.vx =  Math.abs(s.vx) * DAMPING; }
        if (s.x + s.w > cw)   { s.x = cw - s.w; s.vx = -Math.abs(s.vx) * DAMPING; }
      }

      // 2. shape-shape collisions (multiple passes)
      for (let pass = 0; pass < PASSES; pass++) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            const a = arr[i];
            const b = arr[j];

            const ax = a.x + a.w / 2;
            const ay = a.y + a.h / 2;
            const bx = b.x + b.w / 2;
            const by = b.y + b.h / 2;

            const ra = radius(a);
            const rb = radius(b);
            const minDist = ra + rb;

            const dx   = bx - ax;
            const dy   = by - ay;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

            if (dist >= minDist) continue;

            const nx      = dx / dist;
            const ny      = dy / dist;
            const overlap = minDist - dist;

            const aDragged = a.id === draggingId.current;
            const bDragged = b.id === draggingId.current;

            if (!aDragged && !bDragged) {
              // separate equally
              a.x -= nx * overlap / 2;
              a.y -= ny * overlap / 2;
              b.x += nx * overlap / 2;
              b.y += ny * overlap / 2;
              // elastic velocity exchange along normal
              const dvn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
              if (dvn < 0) {
                const imp = -(1 + RESTITUTION) * dvn / 2;
                a.vx -= imp * nx; a.vy -= imp * ny;
                b.vx += imp * nx; b.vy += imp * ny;
              }
            } else if (aDragged) {
              // dragged shape pushes b
              b.x += nx * overlap;
              b.y += ny * overlap;
              const speed = Math.sqrt(a.vx * a.vx + a.vy * a.vy) || 4;
              b.vx = nx * speed * 1.2;
              b.vy = ny * speed * 1.2;
            } else if (bDragged) {
              // dragged shape pushes a
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy) || 4;
              a.vx = -nx * speed * 1.2;
              a.vy = -ny * speed * 1.2;
            }
          }
        }
      }

      setShapes(arr.map(s => ({ ...s })));
      rafRef.current = requestAnimationFrame(tick);
    };

    if (containerRef.current) {
      const r = containerRef.current.getBoundingClientRect();
      containerSize.current = { w: r.width, h: r.height };
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const startDrag = useCallback((id: number, clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerSize.current = { w: rect.width, h: rect.height };
    const s = physicsRef.current.find(s => s.id === id)!;
    dragOffset.current = { x: clientX - rect.left - s.x, y: clientY - rect.top - s.y };
    draggingId.current = id;
    mouseHistory.current = [];
    setActiveId(id);
  }, []);

  const moveDrag = useCallback((clientX: number, clientY: number) => {
    if (draggingId.current === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const id   = draggingId.current;
    const s    = physicsRef.current.find(s => s.id === id)!;
    const x    = Math.max(0, Math.min(clientX - rect.left - dragOffset.current.x, rect.width  - s.w));
    const y    = Math.max(0, Math.min(clientY - rect.top  - dragOffset.current.y, rect.height - s.h));

    const now = Date.now();
    mouseHistory.current.push({ x: clientX, y: clientY, t: now });
    mouseHistory.current = mouseHistory.current.filter(p => now - p.t < 80);

    const idx = physicsRef.current.findIndex(s => s.id === id);
    physicsRef.current[idx] = { ...physicsRef.current[idx], x, y, vx: 0, vy: 0 };
  }, []);

  const endDrag = useCallback(() => {
    if (draggingId.current === null) return;
    const id = draggingId.current;
    const h  = mouseHistory.current;
    let vx = 0, vy = 0;
    if (h.length >= 2) {
      const last = h[h.length - 1], first = h[0];
      const dt   = Math.max((last.t - first.t) / 16, 1);
      vx = Math.max(-18, Math.min(18, (last.x - first.x) / dt));
      vy = Math.max(-18, Math.min(18, (last.y - first.y) / dt));
    }
    const idx = physicsRef.current.findIndex(s => s.id === id);
    physicsRef.current[idx] = { ...physicsRef.current[idx], vx, vy };
    draggingId.current = null;
    mouseHistory.current = [];
    setActiveId(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={e => moveDrag(e.clientX, e.clientY)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      <span className={styles.hint}>drag me</span>
      {shapes.map(s => (
        <div
          key={s.id}
          className={`${styles.shape} ${activeId === s.id ? styles.active : ""}`}
          style={{ left: s.x, top: s.y, zIndex: activeId === s.id ? 10 : 1 }}
          onMouseDown={e => { e.preventDefault(); startDrag(s.id, e.clientX, e.clientY); }}
          onTouchStart={e => startDrag(s.id, e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchEnd={endDrag}
        >
          <ShapeEl type={s.type} color={s.color} w={s.w} h={s.h} />
        </div>
      ))}
    </div>
  );
}
