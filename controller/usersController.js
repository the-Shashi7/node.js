/* const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const users = data.users; */
//Generating json token
const model = require('../model/user_schema')
const User = model.User;
//var jwt = require('jsonwebtoken');


/* exports.createUser = async (req,res)=>{
    const user = new User(req.body);
    var token = jwt.sign({email:req.body.email},'shhhhh');
    user.token = token;

    user.save();
    res.status(201).json(user);
} */

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  console.log({id})
  const user = await User.findById(id);
  res.json(user);
};
exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndReplace({_id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndUpdate({_id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndDelete({_id:id})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};


/* 
exports.getUser = (req,res)=>{
    const id = +req.params.id;
    const user = users.find(p => p.id === id)
    res.status(200).json(user);
}
exports.getUsers = (req,res)=>{
    res.status(200).json(users);
}
exports.createUser = (req, res) => {

    const user =new User(req.body);
    var token = jwt.sign({email:req.body.email},'shhhhh');
    user.token = token;


    console.log(req.body);
    users.push(req.body);
    res.status(201).json(req.body);
  }
exports.replaceUser = (req,res)=>{
    const id = +req.params.id;
    const prdouctIndex = users.findIndex(p=>p.id==id);
    users.splice(prdouctIndex,1,{...req.body});
    res.status(201).json('Done')
}
exports.updateUser = (req,res)=>{
    const id = +req.params.id;
    const prdouctIndex = users.findIndex(p => p.id === id);
    const user = users[prdouctIndex];
    users.splice(prdouctIndex,1,{...user,...req.body});
    res.status(201).json(user)
}
exports.deleteUser = (req,res)=>{
    const id = parseInt(req.body.id);
    const prdouctIndex = users.findIndex((p)=>p.id === id);
    const Deleteduser = users.splice(prdouctIndex,1);
    res.status(200).json(Deleteduser);
}
 */