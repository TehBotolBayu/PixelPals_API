const express = require('express'),
    router = express.Router(),
    contenttagsController = require('../controllers/tagcontentController'),
    auth = require('../middlewares/auth');

router.post('/create', auth.checkToken, contenttagsController.createTag);
router.get('/:contentId', contenttagsController.getAllTagsByContent);
router.delete('/delete', auth.checkToken, contenttagsController.deleteTag)

module.exports = router;