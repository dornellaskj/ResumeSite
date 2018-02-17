import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../client/src/reducers/index';
import { LIST_ACTIONS } from '../../client/src/consts/action_types';
import Head from '../../client/src/headConfigs/headBuilder';
import configs from '../../client/src/headConfigs/charSheet';

export default (req, res) => {
	const context = {};
	let head = ReactDOMServer.renderToString(
		<Head headJson={configs.default} />
	);
	let bundle = '/charSheet-index.js';

	if (context.url) {
		res.writeHead(301, {
			Location: context.url,
		});
		res.end();
	} else {
		res.status(200).send(renderFullPage(head, bundle));
	}
};
function renderFullPage(head, bundle) {
	return `
          <!doctype html>
          <html>
					${head}
            <body>
              <div id="app"></div>
              <script src="${bundle}"></script>
            </body>
          </html>
          `;
}

