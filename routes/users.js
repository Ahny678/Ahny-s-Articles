var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

 
router.post('/create', userController.createUser);
router.get('/all', userController.getAll);
router.get('/:userId', userController.getUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.post('/:userId/articles', userController.postUserArticles);
router.get('/:userId/articles', userController.getUserArticles);
router.put('/:userId/articles/:articleId', userController.updateUserArticle);
router.delete('/:userId/articles/:articleId', userController.deleteUserArticle);
module.exports = router;
/*
# Users Endpoints
1. POST /users: Create a new user
2. GET /users: Get all users
3. GET /users/:id: Get a user by ID
4. PUT /users/:id: Update a user
5. DELETE /users/:id: Delete a user

*/


// 6. POST /users/:id/articles: Add an article to a specific user
// 7. GET /users/:id/articles: Retrieve a list of articles for a specific user
// 4. PUT /users/:id/articles/:id: Update a specific article
// 8. DELETE /users/:id/articles/:articleId: Remove an article from a specific user

 