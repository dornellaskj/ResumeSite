import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import WorksPage from './components/works/WorksPage';
import './styles/index.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <WorksPage/>
  </Provider>,
  document.getElementById('app')
);