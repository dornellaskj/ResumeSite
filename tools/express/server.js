import Open from 'open';
import Express from 'express';
import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import Config from '../../webpack.config.dev';
import Head from '../../source/headConfigs/headBuilder';
import HomePage from '../../source/components/home/HomePage';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../source/store/configureStore';
import homePageConfigs from '../../source/headConfigs/homepage';
let sass = require('node-sass');
const server = Express();
const port = 3000;

const compiler = Webpack(Config);

server.use(WebpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: Config.output.publicPath
}));

server.use(WebpackHotMiddleware(compiler));

server.get('/', buildHome);

function buildHome(request, response) {
  const store = configureStore();
  let html = renderToString(
    <Provider store={store} >
      <HomePage />
    </Provider>
  );
  let head = renderToString(
    <Head headJson={homePageConfigs.default} />
  );
  const preloadedState = store.getState();
  response.status(200).send(renderFullPage(html, preloadedState, head));
}

function renderFullPage(html, preloadedState, head) {
  return `
    <!doctype html>
    <html>
      ${head}
      <body>
        <div id="app">${html}</div>
        <script src="/home-bundle.js"></script>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
      </body>
    </html>
    `;
}

server.listen(port, function(err) {
  /* eslint-disable no-console */

  if (err) {
    console.log(err);
  } else {
    console.log('server running @ port ' + port);
    Open(`http://localhost:${port}`);
  }
});
