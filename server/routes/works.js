import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import WorksPage from '../../client/src/components/works/WorksPage';
import Head from '../../client/src/headConfigs/headBuilder';
import configs from '../../client/src/headConfigs/works';

//const router = express();


export default (req, res) => {
  const context = {};
  let html = ReactDOMServer.renderToString(
    <WorksPage />
  );
  //let html = <p>yo!</p>;
  let head = ReactDOMServer.renderToString(
    <Head headJson={configs.default} />
  );
  let bundle = '/works-index.js';
  
  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).send(renderFullPage(html, head, bundle));
  }
};
function renderFullPage(html, head, bundle) {
  return `
    <!doctype html>
    <html lang="en">
      ${head}
      <body>
        <div id="app">${html}</div>
        <script src="${bundle}"></script>
      </body>
    </html>
    `;
}

