const express = require('express')

const userController = require('../controllers/user')
const isAuth = require('../middleware/authCheck')

const router = express.Router()

router.get('/add-item', isAuth, userController.getAddItem)

router.post('/add-item', isAuth, userController.postAddItem)

router.get('/edit-item/:itemId', isAuth, userController.getEditItem)

router.post('/edit-item', isAuth, userController.postEditItem)

router.post('/delete-item/:itemId', isAuth, userController.deleteItem)

module.exports = router