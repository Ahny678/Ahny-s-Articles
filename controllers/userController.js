const User = require("../models/users");
const Article = require('../models/articles')
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name: name, email: email, password:password});
        res.status(201).json({message: `${user.name} craeted succesfully`});
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message});
    }
};
 
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const {name} = req.body;
        const updatedRowsCount = await User.update(
            { name: name,
             },
            {
              where: {
                id: userId,
              },
            },
          );

          if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        const updatedUser = await User.findByPk(userId);

        return res.status(200).json({message: `${updatedUser.name } updated succesfully`});
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message});
    }
};
 

exports.deleteUser = async (req, res) => {
    try {
        const { userId }= req.params;
        const user = await User.findByPk(userId);
        user.destroy();
        res.status(200).json({message: `User deleted succesfully`});
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message});
    }
};


exports.postUserArticles = async (req, res)=>{
    try{
        const userId = req.params;
        const {category, title, content} = req.body;
        const article = Article.create({
            userId: userId,
            category:category,
            title:title,
            content:content,
        })
        res.status(201).json({success:true, message: `Artcle created succesfully: ${article}`});
        
    } catch(err){
        res.status(500).json({success:true, message: `Artcle create failed`, error: err});
    }
}
exports.getUserArticles = async (req, res)=>{
    try{
        const userId = req.params;
        const articles = Article.findAll({
            where: {userId: userId}
        })
        res.status(200).json({success:true, message: articles});
        
    } catch(err){
        res.status(500).json({success:true, message: `Error retrieveing articles`, error: err});
    }
}
exports.updateUserArticle = async (req, res)=>{
    try{
        //this
        const {userId, articleId} = req.params;
        const {category, title, content} = req.body;

        if(!userId){
            return res.status(404).json({success:false, message: `User with id ${userId} not found`})
        }
        if(!articleId){
            return res.status(404).json({success:false, message: `Article with id ${articleId} not found`})
        }

        const article = Article.findOne({
            where: {userId:userId,
                articleId : articleId
            }
        }) //o this shoud be a middelware func
        if (category)  article.category = category;
        if (title) article.title = title;
        if (content) article.content = content;

        await article.save();
        res.status(200).json({success:true, message: 'Article updated successfully'})

    } catch(err){
        res.status(500).json({success:true, message: `Error updating article`, error: err});
    }
}
exports.deleteUserArticle = async (req, res)=>{
    try{
        const {userId, articleId} = req.params;
        const {category, title, content} = req.body;

        if(!userId){
            return res.status(404).json({success:false, message: `User with id ${userId} not found`})
        }
        if(!articleId){
            return res.status(404).json({success:false, message: `Article with id ${articleId} not found`})
        }

        const article = Article.findOne({
            where: {userId:userId,
                articleId : articleId
            }
        })

        article.destroy();
        res.status(200).json({success:true, message: 'Article deleted successfully'})

    } catch(err){
        res.status(500).json({success:true, message: 'Unable to delete article', error:err})
    }
}





