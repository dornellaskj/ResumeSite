import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (req, res) => {
	const context = {};
	if (context.url) {
		res.writeHead(301, {
			Location: context.url,
		});
		res.end();
	} else {
		res.status(200).send(page);
	}
};
let page =  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	<url>
	<loc>http://www.kevindornellas.com/</loc>
	<lastmod>2018-05-20T19:01:16+00:00</lastmod>
	<priority>1.00</priority>
	</url>
	<url>
	<loc>http://www.kevindornellas.com/resume/</loc>
	<lastmod>2018-05-20T19:01:16+00:00</lastmod>
	<priority>0.80</priority>
	</url>
	<url>
	<loc>http://www.kevindornellas.com/works/</loc>
	<lastmod>2018-05-20T19:01:16+00:00</lastmod>
	<priority>0.80</priority>
	</url>
	<url>
	<loc>http://www.kevindornellas.com/charSheet/</loc>
	<lastmod>2018-05-20T19:01:16+00:00</lastmod>
	<priority>0.64</priority>
	</url>
	<url>
	<loc>http://www.kevindornellas.com/promises/</loc>
	<lastmod>2018-05-20T19:01:16+00:00</lastmod>
	<priority>0.64</priority>
	</url>
	</urlset>`;