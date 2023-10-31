require('dotenv').config;
const express = require('express'),
    app = express(),
    router = require('./routes/index'),
    PORT = process.env.PORT || 3500;

app.use(express.json({ strict : false}));
app.use('/images', express.static('public/images'));
app.use('/api/v1', router);

app.get('*', (req, res) => {
    return res.status(404).json({
        error: 'End point is not registered'
    });
});

app.listen(PORT, () => {
    console.log(`Pixelpal is running in ${PORT}`);
});
