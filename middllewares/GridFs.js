const mongoose = require('mongoose')
const fs = require('fs')
const Promise = require('bluebird')
const { isString } = require('lodash')
const ObjectId = mongoose.Types.ObjectId

let bucket
let db

function init (_db) {
    db = _db
    bucket = new mongoose.mongo.GridFSBucket(db)
}

async function uploadFiles (files, options) {
    return Promise.map(files, file =>  // eslint-disable-line
        uploadFile(file.path, file.key, options), { concurrency: 3 })
}

async function uploadFile (filePath, fileName, options) {
    return new Promise((resolve, reject) => {
        let openUploadStream = bucket.openUploadStream(fileName)
        fs.createReadStream(filePath)
            .pipe(openUploadStream)
            .on('error', function (error) {
                if (options && options.deleteIfError) {
                    deleteFileById(openUploadStream.id)
                    fs.unlink(filePath)
                }
                reject(error)
            })
            .on('finish', function (result) {
                resolve(result)
            })
    })
}

function findFileById (id) {
    return new Promise((resolve, reject) => {
        if (isString(id)) {
            id = ObjectId(id)
        }
        db.collection('fs.files').findOne({ _id: id }, function (err, result) {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

function deleteFileById (id) {
    return new Promise((resolve, reject) => {
        if (isString(id)) {
            id = ObjectId(id)
        }
        bucket.delete(id, function (err) {
            resolve(!err)
        })
    })
}

function getStreamById (id) {
    if (isString(id)) {
        id = ObjectId(id)
    }
    return bucket.openDownloadStream(id)
}

module.exports = {
    init,
    uploadFiles,
    uploadFile,
    findFileById,
    deleteFileById,
    getStreamById,
}