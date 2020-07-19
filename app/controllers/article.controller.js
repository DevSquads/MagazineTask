const Article = require('../models/Article.model.js');

// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request

    if (!req.body) {
        return res.status(400).send({
            message: "Article content can not be empty"
        });
    }

    // Create a Article
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        authorName: req.body.authorName
    });

    // Save Article in the database
    article.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Article."
            });
        });
};

// Retrieve and return all Articles from the database.
exports.findAll = (req, res) => {
    Article.find()
        .then(Articles => {
            res.send(Articles);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Articles."
            });
        });
};

// Find a single Article with a ArticleId
exports.findOne = (req, res) => {
    Article.findById(req.params.ArticleId)
        .then(Article => {
            if (!Article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.ArticleId
                });
            }
            res.send(Article);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.ArticleId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Article with id " + req.params.ArticleId
            });
        });
};

// Update a Article identified by the ArticleId in the request
exports.update = (req, res) => {
    //Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Article content can not be empty"
        });
    }

    // Find Article and update it with the request body
    Article.findByIdAndUpdate(req.params.ArticleId, {
        title: req.body.title,
        description: req.body.description,
        authorName: req.body.authorName
    }, { new: true })//return the modified document to the then()
        .then(Article => {
            if (!Article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.ArticleId
                });
            }
            res.send(Article);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.ArticleId
                });
            }
            return res.status(500).send({
                message: "Error updating Article with id " + req.params.ArticleId
            });
        });
};

// Delete a Article with the specified ArticleId in the request
exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.ArticleId)
        .then(Article => {
            if (!Article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.ArticleId
                });
            }
            res.send({ message: "Article deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.ArticleId
                });
            }
            return res.status(500).send({
                message: "Could not delete Article with id " + req.params.ArticleId
            });
        });
};
