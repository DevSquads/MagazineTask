const articleModel = require('../models/articleModel');

const PAGE_SIZE = 10;

exports.create = (req,res,next) =>{
    articleModel.create(req.body).then(addedArticle => {
        res.setHeader('Content-Type','application/json');
        res.json(addedArticle);
    }).catch(err => next(err));
}

exports.getNumPages = (req,res,next) => {
    articleModel.countArticles()
    .then(articlesNum => {
        res.setHeader('Content-Type','application/json');
        res.json({count: (articlesNum>=PAGE_SIZE?(articlesNum%PAGE_SIZE) : 1) + parseInt((articlesNum*1.0)/PAGE_SIZE) });
    }).catch(err => next);
};

exports.getPage = (req,res,next) => {
    articleModel.getPage(PAGE_SIZE,req.params.pageNum)
    .then(articlePage => {
        res.setHeader('Content-Type','application/json');
        res.json(articlePage);
    }).catch(err => next(err));
}

exports.delete = (req,res,next) => {
    articleModel.deleteOne(req.params.id)
    .then(deletedArticle => {
        res.setHeader('Content-Type','application/json');
        res.json(deletedArticle);
    }).catch(err => next(err));
};


exports.update = (req,res,next) => {
    articleModel.update(req.body.id,req.body.description)
    .then(updatedArticle => {
        res.setHeader('Content-Type','application/json');
        if(updatedArticle === null) next(new Error('not found article'));
        else res.json(updatedArticle);
    }).catch(err => next(err));
};

