import express from 'express';
import path from 'path';
import init from './modules/init';
import shortid from 'shortid';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'src', 'views'));
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));

init();

app.get('/', function(req, res) {
  const userId = shortid.generate();

  res.render('albums', { pageTitle: 'Albums', userId });
});

app.get('/new', function(req, res) {
  res.render('albums');
});

app.listen(port, function() {
  console.log(`server is running on port ${port}`);
});