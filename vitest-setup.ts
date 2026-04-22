/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import '@testing-library/jest-dom/vitest'
import 'vitest-canvas-mock'
import { vi } from 'vitest'

// Mock IntersectionObserver
class IntersectionObserverMock {
  root = null;
  rootMargin = "";
  thresholds = [];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock requestAnimationFrame para componentes de animação
vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: any) => {
  return setTimeout(() => cb(Date.now()), 16) as any;
});

// Mock cancelAnimationFrame
vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: any) => clearTimeout(id));



// Mock framer-motion for simpler testing
vi.mock('framer-motion', async () => {
  const React = await import('react');
  const createMockComponent = (tag: string) => 
    React.forwardRef(({ children, ...props }: any, ref: any) => React.createElement(tag, { ...props, ref }, children));

  return {
    motion: {
      div: createMockComponent('div'),
      span: createMockComponent('span'),
      h1: createMockComponent('h1'),
      p: createMockComponent('p'),
      a: createMockComponent('a'),
      img: createMockComponent('img'),
    },
    AnimatePresence: ({ children }: any) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0, on: () => () => {} } }),
    useSpring: (v: any) => v,
    useTransform: (v: any) => v,
    useMotionValue: (v: any) => ({ get: () => v, set: vi.fn(), on: () => () => {} }),
  };
});
