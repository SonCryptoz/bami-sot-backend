const express = require('express');
const multer = require('multer');
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Thiết lập nơi lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Sử dụng đường dẫn tương đối đến thư mục
        const uploadPath = path.join(__dirname, '../../src/uploads');

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
         // Tên file gốc của người dùng
         const originalName = file.originalname;

         // Loại bỏ các số ở đầu và dấu "-" (nếu có)
         const cleanName = originalName.replace(/^\d+-/, '');
 
         // Đặt lại tên file
         cb(null, cleanName);
    },
});

const upload = multer({ storage: storage });

// Route để xử lý file upload
router.post('/profile', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // Trả về URL để truy cập file đã upload
    res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
