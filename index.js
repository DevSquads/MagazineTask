const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// models
const MagazineArticle = require('./models/MagazineArticle');

dotenv.config();

app.use('/static', express.static('public'));

app.use(express.urlencoded({ extended: true }));

// connection to db
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log('Connected to db!');

  app.listen(3000, () => console.log('Server Up and running'));
});

// view engine configuration
app.set('view engine', 'ejs');

// GET METHOD
app.get('/', (req, res) => {
  MagazineArticle.find({}, (err, articles) => {
    res.render('magazine.ejs', { magazineArticles: articles });
  });
});

// POST METHOD
app.post('/', async (req, res) => {
  const magazineArticle = new MagazineArticle({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
  });

  try {
    await magazineArticle.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

// UPDATE
app
  .route('/edit/:id')
  .get((req, res) => {
    const id = req.params.id;
    MagazineArticle.find({}, (err, articles) => {
      res.render('magazineEdit.ejs', { magazineArticles: articles, idArticle: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    MagazineArticle.findByIdAndUpdate(
      id,
      { title: req.body.title, author: req.body.author, description: req.body.description },
      (err) => {
        if (err) return res.send(500, err);
        res.redirect('/');
      }
    );
  });

// DELETE
app.route('/remove/:id').get((req, res) => {
  const id = req.params.id;
  MagazineArticle.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect('/');
  });
});

// User: magazineTask
// Password: spHb3jMK5r1kappT

// DB_CONNECT = mongodb+srv://diogop:magazineTask@spHb3jMK5r1kappT-1ylat.mongodb.net/test?retryWrites=true
