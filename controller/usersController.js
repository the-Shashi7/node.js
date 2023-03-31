const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const users = data.users;

exports.getUser = (req,res)=>{
    const id = +req.params.id;
    const user = users.find(p => p.id === id)
    res.status(200).json(user);
}
exports.getUsers = (req,res)=>{
    res.status(200).json(users);
}
exports.createUser = (req, res) => {
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
