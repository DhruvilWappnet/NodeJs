const path = require('path');
const multer = require('multer');
const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = file.mimetype.split("/")[0];
        // console.log(file);
        let destinationFolder = 'images';

        cb(null, path.join('uploads/userdata', destinationFolder));
    },
    filename: (req, file, cb) => {
        // cb(null, `${Date.now()}.${file.originalname}`);
        cb(null, `${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        return cb(null, true);
    } else {
        req.fileValidationError = "File type is not supported."
        return cb(new Error('Only images files are allowed!'), false);
    }
};
const uploadFile = multer({ storage: storage, limit: { fileSize: maxSize }, fileFilter: fileFilter }).single('myFile');
// const uploadFile = multer({ storage: storage, limit: { fileSize: maxSize } }).array('myFile', 5);

const fileUpload = (req, res, next) => {
    uploadFile(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                stauts: false,
                message: req.fileValidationError
            });
        }
        else {
            next();
        }
    })
}

module.exports = fileUpload;