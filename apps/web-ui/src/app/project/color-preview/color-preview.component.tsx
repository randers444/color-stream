import { OverflowMenu, OverflowMenuItem, Tile } from 'carbon-components-react';
import { ColorEntry } from '@colorstream/web-data';

import styles from './color-preview.module.scss';


export function ColorPreview(props: { color: ColorEntry }) {
  return (
    <Tile style={{ padding: 0 }}>
      <div style={{ width: '8rem', height: '100px', backgroundColor: props.color.snapshot_value }}
           onClick={() => console.log('click')} />

      <div style={{ padding: '1rem', position: 'relative' }}>
        <h6>{props.color.snapshot_value}</h6>
        <p className={styles['color-preview-value']}>{props.color.snapshot_value}</p>
        <OverflowMenu style={{ position: 'absolute', top: '0', right: 0 }}>
          <OverflowMenuItem itemText='Copy' />
          <OverflowMenuItem
            itemText='Delete'
            isDelete
            hasDivider
          />

        </OverflowMenu>
      </div>


    </Tile>
  );
}

export default ColorPreview;
