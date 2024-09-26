const express = require('express');

const routerr = express.Router();

const{getallProductsStatic, getallProducts} = require('../Controllers/Products');


routerr.route('/').get.getallProducts
routerr.route('/static').get.getallProductsStatic
module.exports = routerr


