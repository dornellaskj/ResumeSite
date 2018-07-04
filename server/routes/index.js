import express from 'express';
import ssr from './ssr';
import resume from './resume';
import works from './works';
import charSheet from './charSheet';
import promises from './promises';
import sitemap from './sitemap';

const app = express();

//app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', ssr);
app.get('/resume', resume);
app.get('/works', works);
app.get('/charSheet', charSheet);
app.get('/promises', promises);
app.get('/promises', promises);
app.get('/sitemap.xml', sitemap);

app.listen(80, () => {
  console.log('SEO site listening on port 80!');
});
