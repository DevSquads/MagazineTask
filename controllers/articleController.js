const articleModel = require('../models/articleModel');
const articleValidator = require('../validators/articleValidator');
const PAGE_SIZE = 4;

const calcultateNumPages = (articlesNum) =>{
    const rem = articlesNum % PAGE_SIZE;
    const div = parseInt((articlesNum * 1.0) / PAGE_SIZE);
    let result = div;
    if(rem>0) result++;
    return result;
};

exports.create = (req, res, next) => {
    articleModel.create(req.body).then(addedArticle => {
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', "*");
        res.json(addedArticle);
    }).catch(err => next(err));
};

exports.getNumPages = (req, res, next) => {
    articleModel.countArticles()
        .then(articlesNum => {
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Headers', "*");
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Headers', "*");
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.header("Pragma", "no-cache");
            res.header("Expires", 0);
            res.statusCode = 200;
            res.json({ count: calcultateNumPages(articlesNum) });
        }).catch(err => next(err));
};

exports.getPageWithCountPages = (req, res, next) => {
    if (!articleValidator.isNumber(req.params.pageNum)) {
        return next(new Error('this is not a page number'));
    }
    const pageNum = req.params.pageNum;
    Promise.all([
        articleModel.countArticles(),
        articleModel.getPage(PAGE_SIZE, pageNum)
    ]).then(([articlesNum, articlePage]) => {
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', "*");
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        res.statusCode = 200;
        return res.json({ count: calcultateNumPages(articlesNum), page: articlePage });
    });
};

exports.getPage = (req, res, next) => {
    if (!articleValidator.isNumber(req.params.pageNum)) {
        return next(new Error('this is not a page number'));
    }
    articleModel.getPage(PAGE_SIZE, req.params.pageNum)
        .then(articlePage => {
            res.header('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Headers', "*");
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.header("Pragma", "no-cache");
            res.header("Expires", 0);
            res.statusCode = 200;
            return res.json(articlePage);
        }).catch(err => next(err));
}

exports.delete = (req, res, next) => {
    articleModel.deleteOne(req.params.id)
        .then(deletedArticle => {
            res.header('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Headers', "*");
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.header("Pragma", "no-cache");
            res.header("Expires", 0);
            res.statusCode = 200;
            res.json(deletedArticle);
        }).catch(err => next(err));
};


exports.update = (req, res, next) => {
    if (!articleValidator.validateBody(req.body, ['id', 'description'])) {
        next(new Error('id or description not existed in body'));
        return;
    }
    articleModel.update(req.body.id, req.body.description)
        .then(updatedArticle => {
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Headers', "*");
            if (updatedArticle === null) next(new Error('not found article'));
            else res.json(updatedArticle);
        }).catch(err => next(err));
};

