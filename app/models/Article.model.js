const mongoose = require('mongoose');
var schema = {
    title: { type: String },
    description: { type: String },
    authorName: { type: String }

}
const ArticleSchema = mongoose.Schema(schema);
module.exports = mongoose.model('Article', ArticleSchema);