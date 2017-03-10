import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import './sass/style.scss';

render(
  <App
    previous={localStorage.getItem('previousSearch') || null}
  />,
  document.getElementById('root')
);
