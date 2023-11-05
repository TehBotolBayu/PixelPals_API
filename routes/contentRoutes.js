const express = require('express'),
    router = express.Router(),
    contentController = require('../controllers/contentController'),
    storage = require('../middlewares/multer'),
    multer = require('multer')(),
    imageKit = require('../middlewares/imageKit'),
    auth = require('../middlewares/auth')

router.post('/create', auth.checkToken, multer.single('image'), imageKit.imagekitUpload, contentController.createContent);
router.put('/update/:contentId', auth.checkToken, multer.single('image'), imageKit.imagekitUpload, contentController.updateContent);
router.get('/', contentController.getContents);
router.get('/:contentId', contentController.getContentById, imageKit.imagekitGet);
router.delete('/delete/:contentId', auth.checkToken, contentController.deleteContent, imageKit.imagekitDelete)

module.exports = router;