import { Path } from '../path/path';

export interface Renderable {
  render(target: RenderTarget): void;
}

export class RenderTarget {
  constructor(private element: SVGElement) {
  }
}

export interface DefaultRenderProps {
  styles: Record<string, string>;
  classes: Record<string, boolean>;
  attributes: Record<string, string>;
}

export interface PathRenderProps {
  path: Path;
}
