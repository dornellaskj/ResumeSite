import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../client/src/reducers/index';
import { LIST_ACTIONS } from '../../client/src/consts/action_types';
import ResumePage from '../../client/src/components/resume/ResumePage';
import Head from '../../client/src/headConfigs/headBuilder';
import configs from '../../client/src/headConfigs/resume';

//const router = express();


export default (req, res) => {
  const store = createStore(reducers);
  store.dispatch({
    type: LIST_ACTIONS.ITEM_ADD,
    item: {
      name: 'middleware',
      description: `Redux middleware solves different problems than Express or Koa middleware, but in a conceptually similar way.
      It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.`,
    },
  });
  const context = {};
  const finalState = store.getState();
  let html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <ResumePage />
    </Provider>
  );
  //let html = <p>yo!</p>;
  let head = ReactDOMServer.renderToString(
    <Head headJson={configs.default} />
  );
  let bundle = '/resume-index.js';
  
  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).send(renderFullPage(html, finalState, head, bundle));
  }
};
function renderFullPage(html, preloadedState, head, bundle) {
  return `
    <!doctype html>
    <html>
      ${head}
      <body>
        <div id="app">${html}</div>
        <script src="${bundle}"></script>
      </body>
    </html>
    `;
}

