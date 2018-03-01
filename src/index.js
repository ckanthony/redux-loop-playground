import './index.css'

import { createStore, compose, applyMiddleware } from 'redux';
import reducer, {initialState} from './reducers.js';
import { install } from 'redux-loop';
import logger from 'redux-logger';
import React from 'react';
import {render} from 'react-dom';

import App from './App'

const enhancer = compose(
  applyMiddleware(logger),
  install()
);

const store = createStore(reducer, initialState, enhancer);

render(
  <App store={store} />,
  document.querySelector('#app'),
);

if (module.hot) {
  module.hot.accept('/', () => {
    const NextApp = require('./App').default;
    render(
      <NextApp store={store} />,
      document.querySelector('#app'),
    )
  })
}
