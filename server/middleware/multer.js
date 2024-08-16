const multer = require("multer");
const path = require("path");
/* This code is setting up a middleware for handling file uploads using the `multer` package in
Node.js. */
let storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/prodImage"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      const imagePath = file.path;
    //   req.locals = {
    //     url: imagePath,
    //   };
// console.log(cb)
    // console.log("req:", req);
    
    // console.log("file:", file);
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only jpeg,  jpg , png, and gif Image allow"));
    }
  },
});


module.exports = upload;
