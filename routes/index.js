'use strict';

import test from './test'

export default app => {
    // app.get('/', (req, res, next) => {
    // 	res.redirect('/');
    // });
    app.use('/test', test);
}