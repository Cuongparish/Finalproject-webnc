const multer = require('multer');

// Cấu hình lưu trữ file và tên file
const storage = multer.memoryStorage(); // Lưu trữ file trong bộ nhớ (buffer)
const upload = multer({ storage: storage });

module.exports = upload;