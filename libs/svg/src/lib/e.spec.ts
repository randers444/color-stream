import { CircleGeometries, CircleShape, Positions } from './shape/circle';
import { ConstantFill } from './style/fill';
import { ConstantStroke } from './style/stroke';

describe('circle', () => {
  it('should render', () => {

    const element = document.getElementById('#test-circle') as unknown as SVGElement;

    const circle = new CircleShape(
      {
        element,
        position: Positions.constant({ x: 1, y: 2 }),
        geometry: CircleGeometries.constant(4),
        style: {
          fill: new ConstantFill(''),
          stroke: new ConstantStroke('')
        }
      });
  });
});
