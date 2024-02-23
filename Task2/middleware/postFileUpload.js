const util = require('util');
const path = require('path');
const multer = require('multer');
const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = file.mimetype.split("/")[0];
        let destinationFolder = '';

        if (ext === "image") {
            destinationFolder = 'images';
        }
        else if (ext === "video") {
            destinationFolder = 'videos';
        }
        else if (ext === "application") {
            if (file.mimetype === 'application/pdf') {
                destinationFolder = 'pdfs';
            } else {
                destinationFolder = 'others';
            }
        }
        else {
            destinationFolder = 'others';
        }
        cb(null, path.join('uploads/postdata',destinationFolder));
    },
    filename: (req, file, cb) => {
        // cb(null, `${Date.now()}.${file.originalname}`);
        cb(null, `${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // Check file type or any other validation if needed
    if (file.mimetype.startsWith('application/')) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'));
    }
};

// const uploadFile = multer({ storage: storage, limit: maxSize }).single('myFile');
const uploadFile = multer({ storage: storage, limit: { fileSize: maxSize } ,fileFilter:fileFilter}).array('myFile', 5);

module.exports = uploadFile;