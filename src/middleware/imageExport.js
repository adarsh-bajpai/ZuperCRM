const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images/')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
    
})

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (extname === '.jpg' || extname === '.png' || extname === '.jpeg') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .jpg and .png files are allowed.'), false); // Reject the file
    }
};

const uploads = multer({storage: storage, fileFilter: fileFilter})

module.exports =  uploads ;