import React from 'react';
import { render } from 'react-dom';
import CharSheet from './components/works/charSheet/CharSheet';
import './styles/index.scss';
import './styles/charSheet.scss';

render(
  <CharSheet />,
  document.getElementById('app')
);
