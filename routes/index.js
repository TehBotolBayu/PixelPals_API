const { Router } = require("express"),
    router = Router(),
    profileRouter = require('./profileRoutes'),
    // imageRouter = require('./imageRoutes'),
    contentRouter = require('./contentRoutes');

// router.use('/profile', profileRouter);
// router.use('/media', imageRouter);
router.use('/content', contentRouter);

module.exports = router;
