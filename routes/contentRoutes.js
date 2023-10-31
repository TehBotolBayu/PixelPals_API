const express = require('express'),
    router = express.Router(),
    contentController = require('../controllers/contentController'),
    storage = require('../middlewares/multer'),
    multer = require('multer')(),
    imageKit = require('../middlewares/imageKit');

router.post('/create', multer.single('image'), imageKit.imagekitUpload, contentController.createContent);
router.put('/edit/:contentId', multer.single('image'), imageKit.imagekitUpload, contentController.updateContent);
router.get('/', contentController.getContents);
router.get('/:contentId', contentController.getContentById, imageKit.imagekitGet);
router.delete('/delete/:contentId', contentController.deleteContent, imageKit.imagekitDelete)

module.exports = router;