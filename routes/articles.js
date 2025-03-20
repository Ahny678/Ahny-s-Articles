 var express = require('express');
 var router = express.Router();
 var articleController = require('../controllers/articleController')
 
  
 router.get('/all', articleController.getAllArticles);
 router.get('/category', articleController.getAllArticlesByCat);
 router.get('/:id', articleController.getArticle);
// 2. GET /articles: Retrieve a list of all articles
// 2. GET /articles/category: Retrieve a list of all articles under a category
// 3. GET /articles/:id: Retrieve a specific article by ID

getAllArticles
getAllArticlesByCat
getArticle


