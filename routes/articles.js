const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', {article: article});
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(article == null) {
        res.redirect('/');
    }
    res.render('articles/show', {article: article});
});

router.post('/', async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect('new'));

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('new'));

router.delete('/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article; 
        article.title = req.body.title;
        article.description = req.body.description;
        article.body = req.body.body;
        article.image = req.body.image;
        article.keywords = req.body.keywords;
        article.citations = req.body.citations;

        try {
            article = await article.save();
            res.redirect(`/articles/${article.id}`);
        } catch(e) {
            console.log(e);
            res.render(`articles/new/${path}`, {article: article});
        }
    }
}

module.exports = router;