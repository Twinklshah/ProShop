import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


//description of all products
//route Get/api/products
//access public
const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({}); // fetching it from database product model
    res.json(products)
});

//description of all products
//route Get/api/products:/id
//access public
const getProductsById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }
    else{
       res.status(404);
       throw new Error('Resource not found');
    }
   
});
export {getProducts,getProductsById};