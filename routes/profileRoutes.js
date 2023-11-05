const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    storage = require('../middlewares/multer'),
    multer = require('multer')(),
    imageKit = require('../middlewares/imageKit'),
    auth = require('../middlewares/auth'),
    login = require('../controllers/authController.js')

router.post('/create', multer.single('image'), imageKit.imagekitUpload, userController.createUser);
router.post('/login', multer.single('image'), login);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById, imageKit.imagekitGet);
router.delete('/delete/:userId', auth.checkToken, userController.deleteUser, imageKit.imagekitDelete);
router.put('/updateProfile/:userId', auth.checkToken, multer.single('image'), imageKit.imagekitUpload, userController.updateProfile);
router.put('/updateUser/:userId', auth.checkToken, multer.single('image'), userController.updateUser);

module.exports = router;