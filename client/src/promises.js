import React from 'react';
import { render } from 'react-dom';
import Promises from './components/works/promises/promises';
import './styles/index.scss';
import './styles/promises.scss';

render(
  <Promises />,
  document.getElementById('app')
);