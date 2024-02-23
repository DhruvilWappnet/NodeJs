const util = require('util');
const path = require('path');
const multer = require('multer');
const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = file.mimetype.split("/")[0];
        let destinationFolder = 'images';

        cb(null, path.join('uploads/userdata', destinationFolder));
    },
    filename: (req, file, cb) => {
        // cb(null, `${Date.now()}.${file.originalname}`);
        cb(null, `${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'));
    }
};

const uploadFile = multer({ storage: storage, limit: { fileSize: maxSize } }).single('myFile');
// const uploadFile = multer({ storage: storage, limit: { fileSize: maxSize },fileFilter:fileFilter }).array('myFile', 5);

module.exports = uploadFile;