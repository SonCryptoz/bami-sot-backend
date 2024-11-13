const express = require('express');
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const router = express.Router();

// Kiểm tra và tạo thư mục nếu chưa tồn tại
const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Thiết lập nơi lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;

        // Xác định đường dẫn lưu trữ dựa trên endpoint
        if (req.url === '/profile') {
            uploadPath = path.join(__dirname, '../../src/uploads/userAvatars');
        } else if (req.url === '/system/admin') {
            uploadPath = path.join(__dirname, '../../src/uploads/productImages');
        }

        // Đảm bảo thư mục tồn tại
        ensureDirectoryExistence(uploadPath);

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
    res.json({ url: `/uploads/userAvatars/${req.file.filename}` });
});

router.post('/system/admin', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // Trả về URL để truy cập file đã upload
    res.json({ url: `/uploads/productImages/${req.file.filename}` });
});

module.exports = router;
