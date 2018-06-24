import React from 'react';
import { render } from 'react-dom';
import ResumePage from './components/resume/ResumePage';
import './styles/resume.scss';
if(typeof window !== 'undefined') {
  render(
    <ResumePage/>,
    document.getElementById('app')
  );
}