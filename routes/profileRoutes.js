const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    storage = require('../middlewares/multer'),
    multer = require('multer')(),
    imageKit = require('../middlewares/imageKit');

router.post('/create', multer.single('image'), imageKit.imagekitUpload, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById, imageKit.imagekitGet);
router.delete('/delete/:userId', userController.deleteUser, imageKit.imagekitDelete);
router.put('/updateProfile/:userId', multer.single('image'), imageKit.imagekitUpload, userController.updateProfile);
router.put('/updateUser/:userId', userController.updateUser);

module.exports = router;