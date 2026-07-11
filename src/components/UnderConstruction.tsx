"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from "./UnderConstruction.module.css";

type ContextValue = {
  open: (label?: string) => void;
};

const UnderConstructionContext = createContext<ContextValue | null>(null);

export function UnderConstructionProvider({ children }: { children: React.ReactNode }) {
  const [label, setLabel] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const open = useCallback((target?: string) => setLabel(target ?? ""), []);
  const close = useCallback(() => setLabel(null), []);

  useEffect(() => {
    if (label === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onPointerDown(e: PointerEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [label, close]);

  return (
    <UnderConstructionContext.Provider value={{ open }}>
      {children}
      {label !== null && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.card} ref={cardRef}>
            <div className={styles.sparkle}>✦</div>
            <div className={styles.heading}>under construction — check back soon!</div>
            <div className={styles.sub}>
              {label ? `"${label}" isn't ready yet, but it's on the way.` : "This part of the site isn't ready yet, but it's on the way."}
            </div>
            <button className={styles.dismiss} onClick={close}>ok, got it</button>
          </div>
        </div>
      )}
    </UnderConstructionContext.Provider>
  );
}

export function useUnderConstruction() {
  const ctx = useContext(UnderConstructionContext);
  if (!ctx) throw new Error("useUnderConstruction must be used within UnderConstructionProvider");
  return ctx;
}
