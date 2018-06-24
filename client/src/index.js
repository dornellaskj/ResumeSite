import React from 'react';
import { render } from 'react-dom';
import HomePage from './components/home/HomePage';
import './styles/skills.scss';

if (typeof window !== 'undefined') {
  render(
    <HomePage />,
    document.getElementById('app')
  );
}
