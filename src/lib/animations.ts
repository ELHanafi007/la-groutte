// ===================================================
// Lagroutte — Animation Presets
// Framer Motion animation configurations
// ===================================================

export const easings = {
  ease: [0.25, 0.1, 0.25, 1.0] as const,
  easeOut: [0.0, 0.0, 0.2, 1.0] as const,
  easeIn: [0.4, 0.0, 1.0, 1.0] as const,
  smooth: [0.16, 1, 0.3, 1] as const,
};

export const springs = {
  default: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 150, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 20 },
};

// --- Reveal Animations ---

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easings.smooth },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: easings.ease },
};

export const fadeDown = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easings.smooth },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: easings.smooth },
};

export const slideInRight = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: easings.smooth },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: easings.smooth },
};

// --- Container Animations ---

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// --- Interaction Presets ---

export const hoverLift = {
  whileHover: { y: -4 },
  transition: { duration: 0.3, ease: easings.smooth },
};

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
};

export const buttonHover = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
};

// --- Viewport Config ---

export const viewportOnce = {
  once: true,
  margin: "-80px" as const,
};

export const viewportEager = {
  once: true,
  margin: "-40px" as const,
};
