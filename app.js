import express from 'express';
import config from 'config-lite';
import chalk from 'chalk';
import router from './routes/index.js';
let http=require('http');
import db from './mongodb/db.js'


const app = express();

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin || 'https://localhost');
    // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    // res.header("X-Powered-By", '3.2.1')
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

router(app);

app.listen(config.port, () => {
    console.log(
        chalk.green(`成功监听端口：${config.port}`)
    )
});