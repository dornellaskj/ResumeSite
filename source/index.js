import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import HomePage from './components/home/HomePage';
import './styles/styles.scss';
import './styles/skills.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <HomePage/>
  </Provider>,
  document.getElementById('app')
);