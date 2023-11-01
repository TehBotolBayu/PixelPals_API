const { Router } = require("express"),
    router = Router(),
    profileRouter = require('./profileRoutes'),
    contentRouter = require('./contentRoutes');

router.use('/profile', profileRouter);
router.use('/content', contentRouter);

module.exports = router;
