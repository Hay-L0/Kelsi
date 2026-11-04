declare module "canvas-confetti" {
  interface Options {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    angle?: number;
    startVelocity?: number;
    decay?: number;
    scalar?: number;
    ticks?: number;
    shapes?: string[];
    gravity?: number;
    drift?: number;
    flat?: boolean;
    disableForReducedMotion?: boolean;
    zIndex?: number;
  }
  function confetti(options?: Options): Promise<null>;
  export default confetti;
}

