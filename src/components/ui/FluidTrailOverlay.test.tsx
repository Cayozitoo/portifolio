import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { FluidTrailOverlay } from './FluidTrailOverlay';

describe('FluidTrailOverlay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve renderizar o canvas com as classes corretas', () => {
    const { container } = render(<FluidTrailOverlay />);

    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas).toBeInTheDocument();
    expect(canvas.tagName).toBe('CANVAS');
  });

  it('deve aplicar className customizada quando fornecida', () => {
    const { container } = render(
      <FluidTrailOverlay className="custom-test-class" />
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveClass('custom-test-class');
  });

  it('deve chamar getContext na inicializacao', () => {
    render(<FluidTrailOverlay />);
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
  });

  it('deve ter pointer-events-none para não interceptar cliques', () => {
    const { container } = render(<FluidTrailOverlay />);

    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveClass('pointer-events-none');
  });

  it('deve ter z-index 0 (camada de fundo)', () => {
    const { container } = render(<FluidTrailOverlay />);

    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveClass('z-0');
  });

  it('deve usar mixBlendMode screen para efeito de sobreposição', () => {
    const { container } = render(<FluidTrailOverlay />);

    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveStyle('mix-blend-mode: screen');
  });

  it('deve ser posicionado absolutamente para cobrir o container pai', () => {
    const { container } = render(<FluidTrailOverlay />);

    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveClass('absolute');
    expect(canvas).toHaveClass('inset-0');
  });

  describe('Props combinadas', () => {
    it('deve renderizar corretamente com props customizadas', () => {
      const { container } = render(
        <FluidTrailOverlay
          color="0, 255, 128"
          brushSize={80}
          trailDecay={0.99}
          className="my-custom-class"
        />
      );

      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).toBeInTheDocument();
      expect(canvas).toHaveClass('my-custom-class');
    });
  });
});
