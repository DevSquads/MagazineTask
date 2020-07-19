const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const { isValidId } = require('../utils')
const Article = require('../models/article');



//get all articles
router.get('/', async (req, res) => {

    //get all articles from db
    let articles = await Article.find({});

    //respond with articles data
    res.json({data: articles});
});

//create new article
router.post('/', async (req, res) => {

    //article schema
    const schema = Joi.object({
        author: Joi.string().trim().required(),
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required()
    });

    //validate data
    let { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(422).json(error.message);
    }

    //create article in db
    let article = await Article.create({
        ...value
    });

    //respond with created article data
    res.json({data: article});
});

//update article
router.put('/:id', async(req, res) =>{

    //check if the article id is valid
    if (!isValidId(req.params.id)) {
        return res.status(422).json('Please enter a valid id!');
    }

    //get the article from db
    let article = await Article.findById(req.params.id);

    //check if article is found
    if (!article) {
        return res.status(404).json('No such article!');
    }

    //article schema
    const schema = Joi.object({
        author: Joi.string().trim(),
        title: Joi.string().trim(),
        description: Joi.string().trim()
    });

    //validate updated data
    let { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(422).json(error.message);
    }

    //update the article in db
    await article.updateOne(value);
    Object.assign({...article}, value);

    //respond with updated data
    let updated = await Article.findById(req.params.id);
    res.json({data: updated});
});

//delete article
router.delete('/:id', async (req, res) => {

    //check if the article id is valid
    if (!isValidId(req.params.id)) {
        return res.status(422).json('Please a valid id!');
    }

    //get the article from db
    let article = await Article.findById(req.params.id);

    //check if article is found
    if (!article) {
        return res.status(404).json('No such article!')
    }

    //delete the article from db
    await Article.deleteOne({_id: req.params.id});

    //respond with deleted data
    res.json({data: article});
});


module.exports = router;