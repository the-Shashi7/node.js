//We are creating server with the help of express ->https://expressjs.com/en/5x/api.html#express
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const server = express();
const path = require('path');
const PORT = 5000;
const productRouter = require('./routes/productsRoute')
const userRouter = require('./routes/usersRoute');
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth')
const fs = require('fs');
const morgan = require('morgan')
const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'),'utf-8')

//connecting to moongose
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/nodejs_coderDost');
  console.log('database connected')
}

//Creating schema

/* const productSchema = new Schema({
      id: Number,
      title: String,
      description:String,
      price: Number,
      discountPercentage: Number,
      rating:Number,
      brand: String,
      category: String,
      thumbnail: String,
      images: [String]
});

//Creating model
const Product = mongoose.model('Product',productSchema); //model should be singular after it'll plural
 */



/* const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;
const morgan = require('morgan') */
console.log('env', process.env.DB_PASSWORD,process.env.DB_USERID );

//bodyParser
const auth = (req,res,next)=>{
    try{
      const token = req.get('Authorization').split('Bearer ')[1];
      console.log(token);
      var decoded = jwt.verify(token,publicKey );
      if(decoded.email){
        next()
      }else{
        res.sendStatus(401)
      }
    }catch(err){
      res.sendStatus(401)
    }
    console.log(decoded)
  };


//const productController = require("./controller/productController.js")
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan('default'))
//server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)))
server.use('/auth',authRouter.router);
server.use('/',productRouter.router);
server.use('/',userRouter.router);
/* 

const data = require('./data.json');
app.use(express.static('public'))

//Middleware :: 5 types 1)Application-level 2)Router-level 3)Error-handling 4)Built-in 5)Third-party
server.use((req,res,next)=>{
    console.log(req.method,req.ip,req.hostname,req.Date(),req.get('User-Agent'));
    next(); //use to call the next point
})

//API -EndPoint - Route
//server.get('/product/:id',(req,res){}) //url.params ?query
server.get('/',(req,res)=>{
   // res.sendStatus(201)
    res.json({type:'GET'})
    //res.sendFile('F:\nodejs\Nodejs 6packprogrammer\index.html')
    //res.send('<h1>Hello</h1>')
})
server.post('/',(req,res)=>{
    res.json({type:'POST'})
})
server.put('/',(req,res)=>{
    res.json({type:'PUT'})
})
server.patch('/',(req,res)=>{
    res.json({type:'PATCH'})
})
server.delete('/',(req,res)=>{
    res.json({type:'DELETE'})
})

 */


//server.get('/products',(req,res)=>{ res.json(products)  })

//Create 

/* const getProduct = (req,res)=>{
    const id = +req.params.id;
    const product = products.find(p => p.id === id)
    res.status(200).json(product);
}
const getProducts = (req,res)=>{
    res.status(200).json(products);
}
const createProduct = (req, res) => {
    console.log(req.body);
    products.push(req.body);
    res.status(201).json(req.body);
  }
const replaceProduct = (req,res)=>{
    const id = +req.params.id;
    const prdouctIndex = products.findIndex(p=>p.id==id);
    products.splice(prdouctIndex,1,{...req.body});
    res.status(201).json('Done')
}
const updateProduct = (req,res)=>{
    const id = +req.params.id;
    const prdouctIndex = products.findIndex(p => p.id === id);
    const product = products[prdouctIndex];
    products.splice(prdouctIndex,1,{...product,...req.body});
    res.status(201).json(product)
}
const deleteProduct = (req,res)=>{
    const id = parseInt(req.body.id);
    const prdouctIndex = products.findIndex((p)=>p.id === id);
    const DeletedProduct = products.splice(prdouctIndex,1);
    res.status(200).json(DeletedProduct);
} */

/* server.post('/products', productController.createProduct);
server.get('/products',productController.getProducts)
server.get('/products/:id',productController.getProduct)
server.put('/products/:id',productController.replaceProduct)
server.patch('/products/:id',productController.updateProduct)
server.delete('/products/:id',productController.deleteProduct) */


server.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})




/*========================  Create server with the help of Node.js or without express.js ======================================

const http = require('http');
const Ram =  require('./Feature.js');
//import Ram from "./Feature.js";

const fs = require("fs");


//index file is read as string
const index = fs.readFileSync('./index.html','utf-8');


const data = fs.readFileSync('./data.json','utf-8');

//converting the json data into JS object by JSON.parse()
const parseData = JSON.parse(fs.readFileSync('./data.json','utf-8'));

//Now taking the firts object from the data.products
const products = parseData.products;

const server = http.createServer((req,res)=>{
    console.log('Server Started')
    res.setHeader('Dummy','Dummy Vlue');
    res.setHeader('Content-Type','text/html'); //application/json
    console.log(req.url);
    if(req.url==='/'){
        res.end(index)
    }
    else if(req.url==='/data'){
        res.setHeader('Content-Type','application/jsons');
        res.end(data)
    }
    else if(req.url==='/about'){
        res.end('<h1>About Page</h1>')
    }
    else if(req.url==='/product'){
        let prdouctIndex = index
                                .replace('**title**',products[1].title)
                                .replace('**price**',products[1].price)
                                .replace('**url**',products[1].thumbnail)
        res.end(prdouctIndex)
    }
    else if(req.url.startsWith('/product')){
        const id = req.url.split('/')[2]
        const product = products.find(p=>p.id===(+id))
        console.log(product)
        res.setHeader('Content-Type', 'text/html');
              let modifiedIndex = index.replace('**title**', product.title)
              .replace('**url**', product.thumbnail)
              .replace('**price**', product.price)
              .replace('**rating**', product.rating)
              res.end(modifiedIndex);
              return;
    }

    else{
        res.end('<h1>404 Page not found</h1>')
    }
    
})
 

server.listen(5000,()=>{
    console.log('running on PORT : 5000')
})

 */

//=========> COMMENTS <============================================================================================



/*
-->Server alway deal with string


*/