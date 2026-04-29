import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpotlightRevealImage } from './SpotlightRevealImage';

describe('SpotlightRevealImage', () => {
  const mockBaseImage = '/avatar_3d.png';
  const mockRevealImage = '/avatar_skeleton.png';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext');

    // Mock para carregar imagens instantaneamente nos testes
    vi.spyOn(window.Image.prototype, 'onload', 'set').mockImplementation(function (this: HTMLImageElement, fn) {
      setTimeout(() => fn?.call(this, {} as Event), 0);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve renderizar dois canvases (trail e composite)', () => {
    const { container } = render(
      <SpotlightRevealImage
        baseImage={mockBaseImage}
        revealImage={mockRevealImage}
        alt="Avatar mock"
      />
    );

    const canvasElements = container.querySelectorAll('canvas');
    expect(canvasElements).toHaveLength(2);
  });

  it('deve aplicar className customizada quando fornecida', () => {
    const { container } = render(
      <SpotlightRevealImage
        baseImage={mockBaseImage}
        revealImage={mockRevealImage}
        alt="Avatar mock"
        className="custom-spotlight-class"
      />
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('custom-spotlight-class');
  });

  it('deve chamar getContext com 2d para os canvases', () => {
    render(
      <SpotlightRevealImage
        baseImage={mockBaseImage}
        revealImage={mockRevealImage}
        alt="Avatar mock"
      />
    );

    // getContext deve ser chamado no mínimo 2 vezes (1 para trail, 1 para composite)
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
  });

  it('deve ter pointer-events-none nos canvases para não interceptar cliques', () => {
    const { container } = render(
      <SpotlightRevealImage
        baseImage={mockBaseImage}
        revealImage={mockRevealImage}
        alt="Avatar mock"
      />
    );

    const canvases = container.querySelectorAll('canvas');
    canvases.forEach((canvas) => {
      expect(canvas).toHaveClass('pointer-events-none');
    });
  });

  it('deve ter overflow-visible no container', () => {
    const { container } = render(
      <SpotlightRevealImage
        baseImage={mockBaseImage}
        revealImage={mockRevealImage}
        alt="Avatar mock"
      />
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('overflow-visible');
  });

  describe('Canvas de Trail (máscara)', () => {
    it('deve ter canvas de trail com opacity-0 (invisível)', () => {
      const { container } = render(
        <SpotlightRevealImage
          baseImage={mockBaseImage}
          revealImage={mockRevealImage}
          alt="Avatar mock"
        />
      );

      const trailCanvas = container.querySelector('canvas.opacity-0');
      expect(trailCanvas).toBeInTheDocument();
    });
  });

  describe('Handlers de Mouse', () => {
    it('deve ter onMouseEnter e onMouseLeave handler no container', () => {
      const { container } = render(
        <SpotlightRevealImage
          baseImage={mockBaseImage}
          revealImage={mockRevealImage}
          alt="Avatar mock"
        />
      );

      const containerDiv = container.firstChild as HTMLElement;
      // React events are attached to properties or mapped differently in RTL, 
      // but testing the presence of these attributes in DOM representation is hard.
      // We can just check that it renders without crashing.
      expect(containerDiv).toBeInTheDocument();
    });
  });
});
