'use strict';

import fsChunks from '../models/readme'

class fsChunksHandle {
    constructor() {
        this.getFile = this.getFile.bind(this);
    }

    async getFile(req, res, next) {
        let fileData;
        fileData = await fsChunks.getFileOData();
        res.send(fileData);
    }
}
export default new fsChunksHandle()