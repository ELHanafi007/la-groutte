"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.2, 
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
    }}>
      {children as any}
    </ReactLenis>
  );
}
