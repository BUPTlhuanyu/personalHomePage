'use strict';
import mongoose from "mongoose"
let  Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


const filesSchema = new mongoose.Schema({
    filename: String,
    chunkSize: Number,
    uploadDate: Date,
    md5: String,
    length: Number
},{collection:'fs.files'});
filesSchema.statics.getFileObjectId=async function(){
    try{
        const fileInfo = await this.find({filename:"readme.md"});
        console.log("filesSchema:"+fileInfo)
        return fileInfo[0];
    }catch(err){
        console.error(err);
    }
}
const fsFiles = mongoose.model('fsFiles', filesSchema);

fsFiles.find((err, data) => {
    if (!data) {
        console.log(1);
    }
});



const chunksSchema = new mongoose.Schema({
    files_id: ObjectId,
    n: Number,
    data:String,
},{collection:'fs.chunks'});

chunksSchema.statics.getFileOData=function(){
    return new Promise(async (resolve, reject) => {
        try{
            console.log("getFileOData");
            const filesId=await fsFiles.getFileObjectId();
            console.log(typeof String(filesId._id))
            console.log(String(filesId._id))
            // const fileData = await this.find({files_id:"5b68515e393d2604dfac7e9d"});
            const fileData = await this.findOne({files_id:String(filesId._id)});
            console.log("fileData:")
            console.log(fileData.data)
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

const fsChunks = mongoose.model('fsChunks', chunksSchema);

fsChunks.findOne((err, data) => {
    if (!data) {
        console.log(1);
    }
});

export default fsChunks


// const papersSchema = new mongoose.Schema({
//     username: String,
// },{collection:'papers'});
//
// papersSchema.statics.getFileOData=function(){
//     return new Promise(async (resolve, reject) => {
//         try{
//             console.log("getFileOData");
//             // const fileInfo=await filesSchema.getFileObjectId;
//             // console.log("fileInfo:"+fileInfo)
//             const fileData = await this.find({username:"lhy"});
//             console.log("fileData:")
//             console.log(fileData)
//             resolve(fileData);
//         }catch(err){
//             reject({
//                 name: 'ERROR_DATA',
//                 message: '查找数据失败',
//             });
//             console.error(err);
//         }
//     })
// }
//
// const papers = mongoose.model('papers', papersSchema);
//
// // papers.findOne((err, data) => {
// //     if (!data) {
// //         console.log(1);
// //     }
// // });
// export default papers