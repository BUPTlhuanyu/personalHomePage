'use strict';
const Encrypt = require('../middllewares/crypto.js');
const http = require('http');
const crypto = require('crypto');
const reqhttp = require("request");
let cookie = null;
let user = {};

function id2Url(pic_str) {
    var magic = str2Arr('3go8&$8*3*3h0k(2)2')
    var songId = str2Arr(pic_str)
    for (var i = 0; i < songId.length; i++) {
        songId[i] = songId[i] ^ magic[i % magic.length]
    }
    var md5 = crypto.createHash('md5');
    md5 = md5.update(arr2Str(songId))
    console.info(md5);
    var res = md5.digest('base64')
    res = res.replace(/\//g, '_')
    res = res.replace(/\+/, '-')
    return res
}

function str2Arr(str) {
    var bytes = []
    for (var i = 0; i < str.length; i++) {
        bytes.push(str.charAt(i).charCodeAt(0))
    }
    return bytes
}

function arr2Str(bytes) {
    var str = ''
    for (var i = 0; i < bytes.length; i++) {
        str += String.fromCharCode(bytes[i])
    }
    return str
}
function createWebAPIRequest(path, data, cookie, response, method) {
    method = method ? method : "POST"
    var music_req = '';
    var cryptoreq = Encrypt(data);
    var http_client = http.request({
        hostname: 'music.163.com',
        method: method,
        path: path,
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'http://music.163.com',
            'Host': 'music.163.com',
            'Cookie': cookie,
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/602.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/602.1'
        }
    }, function (res) {
        res.on('error', function (err) {
            response.status(502).send('fetch error');
        });
        res.setEncoding('utf8');
        if (res.statusCode != 200) {
            createWebAPIRequest(path, data, c, response, method);
            return;
        } else {
            res.on('data', function (chunk) {
                music_req += chunk;
            });
            res.on('end', function () {
                if (music_req == '') {
                    createWebAPIRequest(path, data, c, response, method);
                    return;
                }
                if (res.headers['set-cookie']) {
                    cookie = res.headers['set-cookie'];
                    response.send({
                        code: 200,
                        i: JSON.parse(music_req)
                    });
                    user = JSON.parse(music_req)
                    return;
                }
                response.send(music_req);
            })
        }
    });
    http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
    http_client.end();
}

function createRequest(path, method, data, callback) {
    var ne_req = '';
    var http_client = http.request({
        hostname: 'music.163.com',
        method: method,
        path: path,
        headers: {
            'Referer': 'http://music.163.com',
            'Cookie': 'appver=1.5.6',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            ne_req += chunk;
        });
        res.on('end', function () {
            callback(ne_req);
        })
    });
    if (method == 'POST') {
        http_client.write(data);
    }
    http_client.end();
}

class musicHandle {
    constructor(){
        // this.id2Url=this.id2Url.bind(this);
        // this.str2Arr=this.str2Arr.bind(this);
        // this.arr2Str=this.arr2Str.bind(this);
        // this.createWebAPIRequest=this.createWebAPIRequest.bind(this);
        // this.createRequest=this.createRequest.bind(this);
    }

    getMusicList(request, response, next){
        console.log(1)
        var cookie = request.get('Cookie') ? request.get('Cookie') : (request.query.cookie ? request.query.cookie : '');
        var data = {
            "id": request.query.id,
            "offset": request.query.offset || '0',
            "total": false,
            "n": request.query.limit || 20,
            "limit": request.query.limit || 20,
            "csrf_token": ""
        };
        createWebAPIRequest('/weapi/v3/playlist/detail', data, cookie, response)
    }
}
export default new musicHandle()