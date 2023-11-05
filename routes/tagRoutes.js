const express = require('express'),
    router = express.Router(),
    tagsController = require('../controllers/tagsController'),
    auth = require('../middlewares/auth');

router.post('/create', auth.checkToken, tagsController.createTag);
router.put('/update/:tagId', auth.checkToken, tagsController.updateTags);
router.get('/', tagsController.getAllTags);
router.get('/:tagId', tagsController.getTag);
router.delete('/delete/:tagId', auth.checkToken, tagsController.deleteTag)

module.exports = router;