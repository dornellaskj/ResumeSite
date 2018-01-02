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
import resumeConfigs from '../../source/headConfigs/resume';
import ResumePage from '../../source/components/resume/ResumePage';
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
server.get('/resume', buildResume);

function buildHome(request, response) {
  const store = configureStore();
  let bundle = '/home-bundle.js';
  let html = renderToString(
    <Provider store={store} >
      <HomePage />
    </Provider>
  );
  let head = renderToString(
    <Head headJson={resumeConfigs.default} />
  );
  const preloadedState = store.getState();
  response.status(200).send(renderFullPage(html, preloadedState, head, bundle));
}
function buildResume(request, response) {
  const store = configureStore();
  let bundle = '/resume-bundle.js';
  let html = renderToString(
    <Provider store={store} >
      <ResumePage />
    </Provider>
  );
  let head = renderToString(
    <Head headJson={resumeConfigs.default} />
  );
  const preloadedState = store.getState();
  response.status(200).send(renderFullPage(html, preloadedState, head, bundle));
}

function renderFullPage(html, preloadedState, head, bundle) {
  return `
    <!doctype html>
    <html>
      ${head}
      <body>
        <div id="app">${html}</div>
        <script src=${bundle}></script>
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
