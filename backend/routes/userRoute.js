const express= require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/signup',userController.addUser);
router.post('/login',userController.loginUser);
router.get('/:id',userController.fetchUser);

module.exports= router;