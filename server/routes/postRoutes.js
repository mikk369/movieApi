const express = require('express');
const router = express.Router();
const postApi = require('../controllers/postApi');
const multer = require('multer');
const authController = require('./../controllers/authController');

// // multer middleware
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single('image');

router.use(authController.isLoggedIn);

router
  .route('/')
  .get(postApi.getAllPosts)
  .post(authController.protect,upload, postApi.createPost);

router
  .route('/:id')
  .get(authController.protect,postApi.getPostById)
  .patch(authController.protect,upload, postApi.updatePost)
  .delete(authController.protect,postApi.deletePost);

module.exports = router;
