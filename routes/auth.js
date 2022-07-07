const express = require("express");
const bcrypt = require('bcryptjs')

const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    body("email")
      .isEmail().withMessage("Please enter a valid email")
      .custom(async (value, { req }) => {
        const existingUser = await User.findOne({ email: value });
          if (existingUser) {
              return Promise.reject("Email already in use");
          }
      }),
    body("password").isLength({ min: 6 }).withMessage("Password is too short"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
        const existingUser = await User.findOne({ email: value });
          if (!existingUser) {
              return Promise.reject("Email not found");
          }
      }),
    body("password")
    .custom(async (value, { req }) => {
        const user = await User.findOne({ email: req.body.email });
        const isMatch = await bcrypt.compare(value, user.password);
          if (!isMatch) {
              return Promise.reject("Wrong password");
          }
      }),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

// router.get('/reset', authController.getReset);

// router.post('/reset', authController.postReset);

// router.get('/reset/:token', authController.getNewPassword);

// router.post('/new-password', authController.postNewPassword);

module.exports = router;
