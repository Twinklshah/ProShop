import express from 'express';
const router=express.Router();
// import products from '../data/product.js';
import { getProducts,getProductsById } from '../controllers/productController.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductsById);


export default router;