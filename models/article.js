const mongoose = require('mongoose');

const Article_schema = mongoose.Schema({
    author: {
        type: String,
        required: true,
        text: true
    },
    title:  {
        type: String,
        required: true,
        text: true
    },
    description:  {
        type: String,
        required: true,
        text: true
    }
});

const Article = mongoose.model("Article", Article_schema);
module.exports = Article;

mongoose.set('useCreateIndex', true);