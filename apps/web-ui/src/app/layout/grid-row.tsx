import { ReactNode } from 'react';
import { Properties as CSSProperties } from 'csstype';

export function GridRow(props: { children: ReactNode, style?: CSSProperties }) {
  return (
    <div className='bx--grid bx--row' style={props.style || {}}>{props.children}</div>
  );
}

export default GridRow;
