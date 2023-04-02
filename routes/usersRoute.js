const express = require('express')
const router = express.Router();
const userController = require('../controller/usersController');

router
.get("/users/:id", userController.getUser)
.get("/users/", userController.getUsers)
.put("/users/:id", userController.replaceUser)
.patch("/users/:id", userController.updateUser)
.delete("/users/:id", userController.deleteUser);
//.post("/users", userController.createUser)

exports.router = router;