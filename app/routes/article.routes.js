module.exports = (app) => {
    const articles = require('../controllers/article.controller.js');

    // Create a new Note
    app.post('/articles/Add', articles.create);

    // Retrieve all articles
    app.get('/articles/List', articles.findAll);

    // Retrieve a single Note with noteId
    app.get('/articles/GetById/:ArticleId', articles.findOne);

    // Update a Note with noteId
    app.put('/articles/Update/:ArticleId', articles.update);

    // Delete a Note with noteId
    app.delete('/articles/Delete/:ArticleId', articles.delete);
}