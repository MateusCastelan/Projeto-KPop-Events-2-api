const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
    "article_title": { type: string },
    "article_body": { type: string },
    "article_keywords": { type: string },
    "article_liked_count": { type: integer },
    "article_published": { type: boolean },
    "article_featured": { type: boolean },
    "article_author_email": { type: string },
    "article_published_date": { type: date }
});
  
const Article = mongoose.model('Article', articlesSchema);


module.exports = router;