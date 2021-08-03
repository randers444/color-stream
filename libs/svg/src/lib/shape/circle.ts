import { Observable, of, Subscription } from 'rxjs';
import { Renderable, RenderTarget } from './renderable';
import { tag } from '../tag/tag';
import { Fill } from '../style/fill';
import { Stroke } from '../style/stroke';


interface CircleGeometry {
  radius: Observable<number>;
}

export const CircleGeometries = {
  constant: (radius: number) => ({ radius: of(radius) })
};

interface ShapeStyle {
  fill: Fill;
  stroke: Stroke;
}

interface StyleOptions {
  style: ShapeStyle;
}

interface ShapePosition {
  x: Observable<number>;
  y: Observable<number>;
}

interface PositionSnapshot {
  x: number;
  y: number;
}

export const Positions = {
  constant: ({ x, y }: PositionSnapshot) => ({ x: of(x), y: of(y) })
};


interface ShapeOptions {
  element: SVGElement
  position: ShapePosition;
}


interface CircleOptions extends ShapeOptions, StyleOptions {
  geometry: CircleGeometry;
}

export class CircleShape implements Renderable {
  attributes: Map<string, string | number> = new Map();

  constructor(options: CircleOptions) {
    const sub = new Subscription();
    this.subscribeTo('r', options.geometry.radius, sub);
    this.subscribeTo('fill', options.style.fill.rendered, sub);
    this.subscribeTo('stroke', options.style.stroke.rendered, sub);
  }

  render(target: RenderTarget) {
    return tag(
      'circle', Array.from(this.attributes.entries()));
  }

  private subscribeTo(attribute: string, stream: Observable<string | number>, sub: Subscription) {
    sub.add(stream.subscribe(value => {
      this.attributes.set(attribute, value);
    }));
  }
}
