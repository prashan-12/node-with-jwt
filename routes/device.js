var express = require('express');
var router = express.Router();

const authctrl = require('../controllers/device/auth.ctrl');
const productCtrl = require('../controllers/device/product.ctrl');
const authentication = require('./../utils/authentication');

router.post('/signin', authctrl.signin)
router.post('/signup', authctrl.signup);

router.post("/addProduct",authentication.isAuthenticated, productCtrl.addProduct)
router.post("/getProducts",authentication.isAuthenticated , productCtrl.getProducts)
module.exports = router;
