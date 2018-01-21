import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';
import App from './app';
import HomePage from './components/home/HomePage';

const store = createStore(reducers, {});

if(typeof window !== 'undefined') {
  render(
    <Provider store={store}>
      <HomePage/>
    </Provider>,
    document.getElementById('app')
  )
}
