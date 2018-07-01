import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import sm from 'sitemap';

export default (req, res) => {
	const context = {};
	if (context.url) {
		res.writeHead(301, {
			Location: context.url,
		});
		res.end();
	} else {
		let sitemap = sm.createSitemap ({
      hostname: 'https://www.kevindornellas.com',
      cacheTime: 600000,        // 600 sec - cache purge period
      urls: [
        { url: '/',  changefreq: 'daily', priority: 1.00 },
        { url: '/resume/',  changefreq: 'monthly',  priority: 0.80 },
				{ url: '/works/',  changefreq: 'monthly',  priority: 0.80 },
				{ url: '/charSheet/',  changefreq: 'monthly',  priority: 0.64 },
				{ url: '/promises/',  changefreq: 'monthly',  priority: 0.64 }
      ]
		});
		sitemap.toXML( function (err, xml) {
      res.header('Content-Type', 'application/xml');
      res.send( xml );
		});
	}
};
