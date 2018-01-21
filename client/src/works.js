import React from 'react';
import { render } from 'react-dom';
import WorksPage from './components/works/WorksPage';
import './styles/index.scss';

render(
  <WorksPage/>,
  document.getElementById('app')
);