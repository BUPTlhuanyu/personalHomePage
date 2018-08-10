'use strict';
import mongoose from "mongoose"
let  Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


const filesSchema = new mongoose.Schema({
    filename: String,
    chunkSize: Number,
    uploadDate: Date,
    md5: String,
    length: Number
});
filesSchema.statics.getFileObjectId=async function(){
    try{
        const fileInfo = await this.findOne({filename:"readme.md"});
        return fileInfo.data;
    }catch(err){
        console.error(err);
    }
}
const fsFiles = mongoose.model('fs.files', filesSchema);

fsFiles.findOne((err, data) => {
    if (!data) {
        console.log(1);
    }
});



const chunksSchema = new mongoose.Schema({
    files_id: ObjectId,
    n: Number,
    data: String
});

chunksSchema.statics.getFileOData=function(){
    return new Promise(async (resolve, reject) => {
        try{
            const fileInfo=await filesSchema.getFileObjectId;
            console.log(fileInfo)
            const fileData = await this.findOne({files_id:ObjectId("5b68515e393d2604dfac7e9d")});
            console.log(fileData)
            resolve(fileData.data);
        }catch(err){
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败',
            });
            console.error(err);
        }
    })
}

const fsChunks = mongoose.model('fs.chunks', chunksSchema);

fsChunks.findOne((err, data) => {
    if (!data) {
        console.log(1);
    }
});
export default fsChunks