import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
new Worker('./dist/src/index.js')

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
