import { ReactNode } from 'react';
import { Properties as CSSProperties } from 'csstype';

export function SplitRow(props: { children: ReactNode, style?: CSSProperties }) {
  return (
    <div className='bx--grid bx--row' style={{...(props.style || {}), justifyContent: 'space-between'}}>{props.children}</div>
  );
}

export default SplitRow;
