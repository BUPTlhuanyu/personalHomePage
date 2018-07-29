'use strict';

import mongoose from 'mongoose';
import bookData from '../InitData/book'

const bookSchema = new mongoose.Schema({
    data: {}
});

bookSchema.statics.getAll = function(){
    return new Promise(async (resolve, reject) => {
        try{
            const book = await this.findOne();
            resolve(book.data);
        }catch(err){
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败',
            });
            console.error(err);
        }
    })
}

const Books = mongoose.model('Books', bookSchema);

Books.findOne((err, data) => {
    if (!data) {
        Books.create({data: bookData});
    }
});
export default Books