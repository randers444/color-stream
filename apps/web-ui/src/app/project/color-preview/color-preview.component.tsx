import { OverflowMenuItem } from 'carbon-components-react';
import { ColorEntry } from '@colorstream/web-data';
import ImageTile from '../../layout/image-tile';

import styles from './color-preview.module.scss';

function ColorPreviewImage({ color, onClick }: { color: string, onClick: () => void }) {
  return (
    <div className={styles.ColorPreviewImage}
         // @ts-ignore
         style={{ '--preview-color': color }}
         onClick={onClick} />
  );
}

export function ColorPreview(props: { color: ColorEntry, onClick: () => void }) {
  return (
    <ImageTile image={<ColorPreviewImage color={props.color.snapshot_value} onClick={props.onClick} />}
               menuItems={
                 <>
                   <OverflowMenuItem itemText='Copy' />
                   <OverflowMenuItem
                     itemText='Delete'
                     isDelete
                     hasDivider
                   />
                 </>
               }>
      <h6>{props.color.snapshot_value}</h6>
      <p className={styles['color-preview-value']}>{props.color.snapshot_value}</p>
    </ImageTile>
  )
    ;
}

export default ColorPreview;
