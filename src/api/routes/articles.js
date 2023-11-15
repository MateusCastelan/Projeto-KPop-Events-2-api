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
      res.json({ message: 'Artigo salvo com sucesso!', newArticle });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const foundArticle = await Article.find();
      console.log('Objetos encontrados com sucesso!');
      res.status(200).json(foundArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
      const foundArticle = await Article.findById( pid );
      console.log('Objeto encontrado com sucesso!');
      res.json({ message: 'Artigo encontrado com sucesso!', foundArticle });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const newArticle = req.body;
    // const newArticle = req.body.article;
    console.log(newArticle);
    try {
      const updatedArticle = await Article.findByIdAndUpdate(pid, 
        { 
          article_title: newArticle.article_title,
          article_body: newArticle.article_body,
          article_keywords: newArticle.article_keywords,
          article_published: newArticle.article_published,
          article_featured: newArticle.article_featured,
          article_author_email: newArticle.article_author_email,
        }, { new: true });
      console.log('Objeto Atualizado:', updatedArticle);
      res.json({ message: 'Artigo alterado com sucesso!', updatedArticle });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
      const deletedArticle = await Article.findByIdAndDelete(pid);
      console.log('Objeto deletado:', deletedArticle);
      res.json({ message: 'Artigo deletado com sucesso!', deletedArticle });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;