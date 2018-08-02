'use strict';

import express from 'express'
import BookHandle from '../controller/book'
const router = express.Router()

router.get('/book', BookHandle.getBooks);

export default router