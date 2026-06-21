// src/components/element/ScrollReveal.tsx

"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollReveal({
  children,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: false,
    margin: "-20% 0px -20% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // GERAK PARALLAX
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [180, -180]
  );

  // FADE
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0, 1, 1, 1, 0]
  );

  // SCALE
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.92, 1, 0.92]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        scale,
      }}
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0,
              y: 100,
            }
      }
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}