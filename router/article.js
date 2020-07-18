const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const { isValidId } = require('../utils')
const Article = require('../models/article');



//get all articles
router.get('/', async (req, res) => {
    let articles = await Article.find({});
    res.json({data: articles});
});

//create new article
router.post('/', async (req, res) => {
    const schema = Joi.object({
        author: Joi.string().trim().required(),
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required()
    });

    console.log("after schema");
    let { error, value } = schema.validate(req.body);
    console.log(req.body);
    if (error) {
        return res.status(422).json(error.message);
    }

    let article = await Article.create({
        ...value
    });

    console.log("before res");

    res.json({data: article});
});

//update article
router.put('/:id', async(req, res) =>{
    if (!isValidId(req.params.id)) {
        return res.status(422).json('Please enter a valid id!');
    }

    let article = await Article.findById(req.params.id);

    if (!article) {
        return res.status(404).json('No such article!');
    }

    const schema = Joi.object({
        author: Joi.string().trim(),
        title: Joi.string().trim(),
        description: Joi.string().trim()
    });

    let { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(422).json(error.message);
    }

    await article.updateOne(value);

    Object.assign({...article}, value);

    let updated = await Article.findById(req.params.id);
    res.json({data: updated});
});

//delete article
router.delete('/:id', async (req, res) => {

    if (!isValidId(req.params.id)) {
        return res.status(422).json('Please a valid id!');
    }

    let article = await Article.findById(req.params.id);

    if (!article) {
        return res.status(404).json('No such article!')
    }

    await Article.deleteOne({_id: req.params.id});
    res.json({data: article});
});


module.exports = router;