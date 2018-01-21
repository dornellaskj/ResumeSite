import express from 'express';
import ssr from './ssr';
import resume from './resume';
import works from './works';

const app = express();

//app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', ssr);
app.get('/resume', resume);
app.get('/works', works);

app.listen(3000, () => {
  console.log('Hello World listening on port 3000!');
});
