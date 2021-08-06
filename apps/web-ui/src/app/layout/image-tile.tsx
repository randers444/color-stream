import styles from '../project/color-preview/color-preview.module.scss';
import { Link, OverflowMenu, OverflowMenuItem, Tile } from 'carbon-components-react';
import { FnComponent } from '../types.util';
import { ArrowRight } from '@carbon/icons-react/next';
import { ReactElement } from 'react';

interface ImageTileProps {
  image: ReactElement;
  children: ReactElement[] | ReactElement;
  onNavigate?: () => void;
  menuItems: ReactElement<OverflowMenuItem>[] | ReactElement<OverflowMenuItem>
}

function ImageTile(props: ImageTileProps) {
  return <Tile style={{ padding: 0 }}>
    {props.image}
    <div style={{ padding: '1rem', position: 'relative' }}>
      {props.children}
      <OverflowMenu style={{ position: 'absolute', top: '0', right: 0 }}>
        {props.menuItems}


      </OverflowMenu>
      {props.onNavigate ? (
        <Link onClick={props.onNavigate} style={{marginTop: '1rem', cursor: 'pointer'}}>
          <ArrowRight />
        </Link>
      ) : null
      }
    </div>
  </Tile>;
}

export default ImageTile;
