const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
