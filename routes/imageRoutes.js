// routers/media.routers.js
const router = require('express').Router();
const storage = require('../middlewares/multer');
const { imagekitUpload } = require('../controllers/imageController');

// router.post('/images', storage.image.single('image'), strogeImage);
// router.post('/videos', storage.image.single('video'), storageVideo);
// router.post('/files', storage.image.single('file'), storageFile);

const multer = require('multer')();
router.post('/imagekit', multer.single('image'), imagekitUpload);
// router.post('/videokit', storage.single('video'), imagekitUpload);

module.exports = router;