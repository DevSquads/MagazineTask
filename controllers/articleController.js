const articleModel = require('../models/articleModel');


exports.create = (req,res,next) =>{
    articleModel.create(req.body).then(addedArticle => {
        res.setHeader('Content-Type','application/json');
        res.json(addedArticle);
    });
}
