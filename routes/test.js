'use strict';

import express from 'express'
const router = express.Router()

router.get('/test_v1', function (req, res) {
    res.send('GET request to the homepage');
});

export default router