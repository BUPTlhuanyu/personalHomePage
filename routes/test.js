'use strict';

import express from 'express'
import BookHandle from '../controller/book'
import MusicHandle from '../controller/music'
const router = express.Router()

router.get('/book', BookHandle.getBooks);
router.get('/music/api/playlist/detail',MusicHandle.getMusicList);

export default router