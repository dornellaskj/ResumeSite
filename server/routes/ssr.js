import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HomePage from '../../client/src/components/home/HomePage';
import Head from '../../client/src/headConfigs/headBuilder';
import homePageConfigs from '../../client/src/headConfigs/homepage';


export default (req, res) => {
  const router = express();
  const context = {};
  let html = ReactDOMServer.renderToString(
      <HomePage />
  );
  //let html = <p>yo!</p>;
  let head = ReactDOMServer.renderToString(
    <Head headJson={homePageConfigs.default} />
  );
  let bundle = '/home-index.js';
  
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