const express = require('express');
const router = express.Router();
const userApi = require('../controllers/userApi');
const authController = require('../controllers/authController');


router.use(authController.isLoggedIn);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(userApi.getAllUsers).post(userApi.createUser);

router
  .route('/:id')
  .get(userApi.getUser)
  .patch(userApi.updateUser)
  .delete(userApi.deleteUser);

module.exports = router;    