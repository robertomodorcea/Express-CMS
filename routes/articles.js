const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('./../views/articles/new', { article: new Article() });
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,  
        description: req.body.description,
        body: req.body.body,
        image: req.body.image
    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch(e) {
        console.log(e);
        res.render('articles/new', {article: article});
    }
    
});

module.exports = router;