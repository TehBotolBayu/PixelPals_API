const { Router } = require("express"),
    router = Router(),
    profileRouter = require('./profileRoutes'),
    contentRouter = require('./contentRoutes'),
    tagRouter = require('./tagRoutes'),
    contenttagRouter = require('./contenttagRoutes');

router.use('/profile', profileRouter);
router.use('/content', contentRouter);
router.use('/tag', tagRouter);
router.use('/ct', contenttagRouter);

module.exports = router;
