"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 550, damping: 38, mass: 0.18 });
  const springY = useSpring(y, { stiffness: 550, damping: 38, mass: 0.18 });
  const [enabled, setEnabled] = useState(false);
  const [overInteractive, setOverInteractive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("a, button, [role='button']"));
    const enter = (event: PointerEvent) => setOverInteractive(isInteractive(event.target));
    const leave = (event: PointerEvent) => {
      if (!isInteractive(event.relatedTarget)) setOverInteractive(false);
    };

    let listening = false;
    const updateEnabled = () => {
      const shouldEnable = finePointer.matches && !reducedMotion.matches;
      setEnabled(shouldEnable);
      if (shouldEnable && !listening) {
        window.addEventListener("pointermove", move, { passive: true });
        document.addEventListener("pointerover", enter, { passive: true });
        document.addEventListener("pointerout", leave, { passive: true });
        listening = true;
      } else if (!shouldEnable && listening) {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", enter);
        document.removeEventListener("pointerout", leave);
        setOverInteractive(false);
        listening = false;
      }
    };

    finePointer.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);
    updateEnabled();

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("pointerout", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.span
      aria-hidden="true"
      className={`custom-cursor${overInteractive ? " custom-cursor--active" : ""}`}
      style={{ x: springX, y: springY }}
    >
      <span className="custom-cursor-dot" />
      <span className="custom-cursor-ring" />
    </motion.span>
  );
}
