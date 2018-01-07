import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import ResumePage from './components/resume/ResumePage';
import './styles/index.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <ResumePage/>
  </Provider>,
  document.getElementById('app')
);