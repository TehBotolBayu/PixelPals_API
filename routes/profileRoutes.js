const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    storage = require('../middlewares/multer'),
    multer = require('multer')();

router.post('/create', multer.single('image'), userController.createUser);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId', userController.updateProfile);
router.put('/auth/:userId', userController.updateUser);

module.exports = router