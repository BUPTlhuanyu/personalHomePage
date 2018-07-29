'use strict';
// 引入模块
import mongoose from 'mongoose';
import config from 'config-lite';
import chalk from 'chalk';
// 连接数据库
mongoose.connect(config.url, {useMongoClient:true});
mongoose.Promise = global.Promise;

// 获取连接数据库句柄
const db = mongoose.connection;

//通过句柄监听数据库连接事件
db.once('open' ,() => {
    console.log(
        chalk.green('连接数据库成功')
    );
})

db.on('error', function(error) {
    console.error(
        chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;
