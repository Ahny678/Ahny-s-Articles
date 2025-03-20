const Article = require('../models/articles')

exports.getAllArticles = (req, res) =>{
    try{
        const articles = Article.findAll();
        res.status(200).json({message:articles});
    }catch(err){
        res.status(500).json({message:'Error retriving articles', error: err});
    }
}
exports.getAllArticlesByCat = (req, res) =>{
    try{
        const category = req.params;
        const articles = Article.findAll({
            where:{category:category}
        })
        res.status(200).json({message:articles});
    }catch(err){
            res.status(500).json({message:'Error retriving articles', error: err}); 
    }
}
exports.getArticle = (req, res) =>{
    try{
        const articleId = req.params;
        const article = Article.findOne({
            where: {articleId:articleId}
        })
        res.status(200).json({message:article});
    }catch(err){
        res.status(500).json({message:'Error retriving article', error: err}); 
    }
}

