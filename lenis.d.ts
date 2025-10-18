declare module '@studio-freight/lenis' {
  export default class Lenis {
    constructor(options?: {
      duration?: number;
      easing?: (t: number) => number;
      direction?: 'vertical' | 'horizontal';
      gestureDirection?: 'vertical' | 'horizontal';
      smooth?: boolean;
      smoothTouch?: boolean;
      touchMultiplier?: number;
      infinite?: boolean;
    });
    
    raf(time: number): void;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    destroy(): void;
    start(): void;
    stop(): void;
    scrollTo(target: string | number | HTMLElement, options?: any): void;
  }
}
