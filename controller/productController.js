const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

exports.getProduct = (req,res)=>{
    const id = +req.params.id;
    const product = products.find(p => p.id === id)
    res.status(200).json(product);
}
exports.getProducts = (req,res)=>{
    res.status(200).json(products);
}
exports.createProduct = (req, res) => {
    console.log(req.body);
    products.push(req.body);
    res.status(201).json(req.body);
  }
exports.replaceProduct = (req,res)=>{
    const id = +req.params.id;
    const prdouctIndex = products.findIndex(p=>p.id==id);
    products.splice(prdouctIndex,1,{...req.body});
    res.status(201).json('Done')
}
exports.updateProduct = (req,res)=>{
    const id = +req.params.id;
    const prdouctIndex = products.findIndex(p => p.id === id);
    const product = products[prdouctIndex];
    products.splice(prdouctIndex,1,{...product,...req.body});
    res.status(201).json(product)
}
exports.deleteProduct = (req,res)=>{
    const id = parseInt(req.body.id);
    const prdouctIndex = products.findIndex((p)=>p.id === id);
    const DeletedProduct = products.splice(prdouctIndex,1);
    res.status(200).json(DeletedProduct);
}
