echo Please enter the name of your new page
read pageName
upperPageName=`echo ${pageName:0:1} | tr  '[a-z]' '[A-Z]'`${pageName:1}
echo "import React from 'react';
import ReactDOMServer from 'react-dom/server';
import $pageName from '../../client/src/components/$pageName/$upperPageName';
import Head from '../../client/src/headConfigs/headBuilder';
import configs from '../../client/src/headConfigs/$pageName';

function renderFullPage(html, head, bundle) {
  return \`
    <!doctype html>
    <html lang=\"en\">
      \${head}
      <body>
        <div id=\"app\">\${html}</div>
        <script src=\"\${bundle}\"></script>
      </body>
    </html>
    \`;
}

export default (req, res) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
      <$pageName />
  );
  const head = ReactDOMServer.renderToString(
    <Head headJson={configs.default} />
  );
  const bundle = '/$pageName-index.js';
  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).send(renderFullPage(html, head, bundle));
  }
};" >> ./server/routes/$pageName.js
mkdir ./client/src/components/$pageName/
echo "import React, {Component} from 'react';
import Header from '../common/Header';

class $upperPageName extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
        <div className=\"container\">
            <Header />
            <p>This is a scaffolded page!</p>
        </div>
        );
    }
}

export default $upperPageName;" >> ./client/src/components/$pageName/$upperPageName.js
echo "module.exports.default = 
{
	\"title\": \"$upperPageName Title\",
	meta: [
    { name: \"viewport\", content: \"width=device-width,initial-scale=1\" }
    { name: \"description\", content: \"page description here.\" },
		{ property:\"og:url\", content:\"http://www.example.com/\"},
		{ property:\"og:description\", content:\"page description here.\"},
		{ property:\"og:title\", content:\"$upperPageName Title\"},
		{ property:\"og:image\", content:\"image url here\"},
		{ property:\"og:site_name\",	content:\"example.com\"}
	],
	scss: [
		{rel:\"canonical\", href:\"cannonical URL here\"},
		{rel:\"stylesheet\", type:\"text/css\", href:\"/$pageName.css\"}
	]
};" >> ./client/src/headConfigs/$pageName.js

echo "@import './common';" >> ./client/src/styles/$pageName.scss
echo "import React from 'react';
import { render } from 'react-dom';
import $upperPageName from './components/$pageName/$upperPageName';
import './styles/$pageName.scss';

render(
  <$upperPageName/>,
  document.getElementById('app')
);" >> ./client/src/$pageName.js
read dun