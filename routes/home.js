const express = require('express')

const homeController = require('../controllers/home')
const isAuth = require('../middleware/authCheck')

const router = express.Router()

router.get('/', homeController.getIndex)

router.get('/about', homeController.getAbout)

router.get('/item/:itemId', isAuth, homeController.getDetail)

router.get('/search', isAuth, homeController.getSearch)

module.exports = router