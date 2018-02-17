import resume from './resume';
import works from './works';
import charSheet from './charSheet';
app.get('/resume', resume);
app.get('/works', works);
app.get('/charSheet', charSheet);
app.listen(80, () => {
  console.log('Hello World listening on port 80!');
});