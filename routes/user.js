const express = require("express");

const { body } = require("express-validator");

const userController = require("../controllers/user");
const isAuth = require("../middleware/authCheck");

const router = express.Router();

router.get("/add-item", isAuth, userController.getAddItem);

router.post(
  "/add-item",
  [
    body("title").isLength({ min: 1 }).withMessage("Title can't be empty"),
    body("imageUrl")
      .isLength({ min: 1 })
      .withMessage("Image can't be empty")
      .isURL({ min: 1 })
      .withMessage("Image must be a valid URL"),
    body("totalChap").isLength({ min: 1 }).withMessage("Total can't be empty"),
    body("stopChap")
      .isLength({ min: 1 })
      .withMessage("Stop can't be empty")
      .custom((value, { req }) => {
        const totalChap = req.body.totalChap;
        if (+value > +totalChap) {
          throw new Error("Stopped value can't be greater than Total");
        }
        return true;
      }),
  ],
  isAuth,
  userController.postAddItem
);

router.get("/edit-item/:itemId", isAuth, userController.getEditItem);

router.post(
  "/edit-item",
  [
    body("title").isLength({ min: 1 }).withMessage("Title can't be empty"),
    body("imageUrl")
      .isLength({ min: 1 })
      .withMessage("Image can't be empty")
      .isURL({ min: 1 })
      .withMessage("Image must be a valid URL"),
    body("totalChap").isLength({ min: 1 }).withMessage("Total can't be empty"),
    body("stopChap")
      .isLength({ min: 1 }).withMessage("Stop can't be empty")
      .custom((value, { req }) => {
        const totalChap = req.body.totalChap;
        if (+totalChap < +value) {
          throw new Error("Stopped value can't be greater than Total");
        }
        return true;
      }),
  ],
  isAuth,
  userController.postEditItem
);

router.post("/delete-item/:itemId", isAuth, userController.deleteItem);

module.exports = router;
