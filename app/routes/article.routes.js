module.exports = (app) => {
    const articles = require('../controllers/article.controller.js');

    // Create a new Article
    app.post('/articles/Add', articles.create);

    // Retrieve all articles
    app.get('/articles/List', articles.findAll);

    // Retrieve a single Articlewith ArticleId
    app.get('/articles/GetById/:ArticleId', articles.findOne);

    // Update a Articlewith ArticleId
    app.put('/articles/Update/:ArticleId', articles.update);

    // Delete a Articlewith ArticleId
    app.delete('/articles/Delete/:ArticleId', articles.delete);
}