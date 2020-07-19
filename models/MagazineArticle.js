const mongoose = require('mongoose');
const magazineArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('MagazineArticle', magazineArticleSchema);
