import React from 'react';
import { render } from 'react-dom';
import HomePage from './components/home/HomePage';
import './styles/index.scss';

if (typeof window !== 'undefined') {
  render(
    <HomePage />,
    document.getElementById('app')
  );
}
