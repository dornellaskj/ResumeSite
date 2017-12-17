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
import { match, RouterContext, Router } from 'react-router';
import routes from '../../source/routes';
import configureStore from '../../source/store/configureStore';
import homePageConfigs from '../../source/headConfigs/homepage';

const server = Express();
const port = 3000;

const compiler = Webpack(Config);

server.use(WebpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: Config.output.publicPath
}));

server.use(WebpackHotMiddleware(compiler));

server.get('/', buildHome);

function handleRoutes(request, response) {
  match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      handleRender(response, renderProps);
    } else {
      response.status(404).send('Not found');
    }
  });
}

function buildHome(request, response) {
  const store = configureStore();
  const html = renderToString(
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

function handleRender(response, renderProps) {
  const store = configureStore();
  const html = renderToString(
    <Provider store={store} >
      <RouterContext {...renderProps} />
    </Provider>
  );
  let head = renderToString(
    <Head headJson={renderProps.routes[1].headConfig.default} />
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
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/bundle.js"></script>
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
