const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
    article_title: { type: String },
    article_body: { type: String },
    article_keywords: { type: String },
    article_liked_count: { type: Number, default: 0 },
    article_published: { type: Boolean },
    article_featured: { type: Boolean },
    article_author_email: { type: String },
    article_published_date: { type: Date, default: Date.now }
});
  
const Article = mongoose.model('Article', articlesSchema);

router.post('/', async (req, res) => {
    const article = req.body;
    // const article = req.body.article;
    try {
      const newArticle = await Article.create(article);
      console.log('Objeto salvo com sucesso!');
      res.json({ message: 'Usuário salvo com sucesso!', newArticle });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



module.exports = router;