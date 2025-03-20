var express = require('express');
var router = express.Router();
var aboutController = require('../controllers/userController')

 
router.post('/:id/about', aboutController.createAbout);
router.get('/:id/about', aboutController.getAbout);
router.put('/:id/about', aboutController.updateAbout);
router.delete('/:id/about', aboutController.deleteAbout);

 

// 1. POST /users/:id/about: Create a new about entry for a specific user
// 2. GET /users/:id/about: Retrieve the about entry for a specific user
// 3. PUT /users/:id/about: Update the about entry for a specific user
// 4. DELETE /users/:id/about: Delete the about entry for a specific user