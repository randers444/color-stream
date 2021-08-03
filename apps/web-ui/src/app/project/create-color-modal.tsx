import { createRef, useState } from 'react';
import { Modal, TextInput, Tile } from 'carbon-components-react';

export interface CreateColor {
  name: string;
  color: string;
}

export function CreateColorModal(props: { open: boolean, onClose: () => void, onCreate: (value: CreateColor) => void }) {
  const nameRef = createRef<HTMLInputElement>();
  const colorRef = createRef<HTMLInputElement>();

  const [color, setColor] = useState('');

  return (
    <Modal
      open={props.open}
      onRequestClose={props.onClose}
      onRequestSubmit={() => {
        const color = colorRef.current?.value;
        const name = nameRef.current?.value;
        if (color && name) {
          props.onCreate({
            color, name
          });
        }
      }}
      modalHeading='Add a new color'
      modalLabel='New Color'
      primaryButtonText='Add'
      secondaryButtonText='Cancel'>
      <p style={{ marginBottom: '1rem' }}>
        Creating a new color, here's some text
      </p>
      <TextInput
        ref={nameRef}
        data-modal-primary-focus
        id='text-input-1'
        labelText='Name'
        placeholder='Primary'
        style={{ marginBottom: '1rem' }}
        onChange={e => setColor(e.target.value)}
      />
      <TextInput
        ref={colorRef}
        data-modal-primary-focus
        id='text-input-1'
        labelText='Color'
        placeholder='#443324, red, hsla(2, 3, 4, 0.6), etc.'
        style={{ marginBottom: '1rem' }}
        onChange={e => setColor(e.target.value)}
      />
      <Tile style={{ width: '10em', height: '4em', backgroundColor: color, border: '1px solid #8d8d8d' }} />
    </Modal>
  );
}

export default CreateColorModal;
