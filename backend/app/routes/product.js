const express = require('express')
      productController = require('../controller/productController')
      productRoutes = express.Router();
      
module.exports = (app) => {
    productRoutes.get('/', productController.getAll)
    app.use('/api/v1/products', productRoutes)
}