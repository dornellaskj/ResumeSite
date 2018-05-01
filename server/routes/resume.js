import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ResumePage from '../../client/src/components/resume/ResumePage';
import Head from '../../client/src/headConfigs/headBuilder';
import configs from '../../client/src/headConfigs/resume';

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

export default (req, res) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
      <ResumePage />
  );
  const head = ReactDOMServer.renderToString(
    <Head headJson={configs.default} />
  );
  const bundle = '/resume-index.js';
  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).send(renderFullPage(html, head, bundle));
  }
};
