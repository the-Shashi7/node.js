/* const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const fs = require('fs');
const products = data.products; */
const model = require("../model/product_schema");
const Product = model.Product;


exports.createProduct = (req, res) => {
    const product = new Product(req.body);
    product.save((err,doc)=>{
      console.log({err,doc})
      if(err){
        res.status(400).json(err);
      } else{
        res.status(201).json(doc);
      }
    })
  };
  
  exports.getProducts = async (req, res) => {
    const products = await Product.find({price:{$gt:500}});
    res.json(products);
  };
  
  exports.getProduct = async (req, res) => {
    const id = req.params.id;
    console.log({id})
    const product = await Product.findById(id);
    res.json(product);
  };
  exports.replaceProduct = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await Product.findOneAndReplace({_id:id},req.body,{new:true})
    res.status(201).json(doc);
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
  };
  exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json(doc);
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
  };
  exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await Product.findOneAndDelete({_id:id})
    res.status(201).json(doc);
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
  };






/*
exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product.save();
  res.status(201).json(req.body);
};

exports.getProduct = async (req, res) => {
    const id = req.params.id;
    console.log({id});
    const product = await Product.findById(id);
    res.status(200).json(product);
};
exports.getProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json(product);
};

exports.getProducts = (req,res)=>{
    res.status(200).json(products);
}
 exports.createProduct = (req, res) => {
    res.status(201).json(req.body);
    console.log(req.body);
    products.push(req.body);
  } 
exports.replaceProduct = (req, res) => {
  const id = +req.params.id;
  const prdouctIndex = products.findIndex((p) => p.id == id);
  products.splice(prdouctIndex, 1, { ...req.body });
  res.status(201).json("Done");
};
exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const prdouctIndex = products.findIndex((p) => p.id === id);
  const product = products[prdouctIndex];
  products.splice(prdouctIndex, 1, { ...product, ...req.body });
  res.status(201).json(product);
};
exports.deleteProduct = (req, res) => {
  const id = parseInt(req.body.id);
  const prdouctIndex = products.findIndex((p) => p.id === id);
  const DeletedProduct = products.splice(prdouctIndex, 1);
  res.status(200).json(DeletedProduct);
};
*/