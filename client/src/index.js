import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

render(
  <App
    previous={localStorage.getItem('previousSearch') || null}
  />,
  document.getElementById('root')
);
