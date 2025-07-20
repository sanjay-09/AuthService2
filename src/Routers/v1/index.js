const express=require("express");
const router=express.Router();
const {UserController}=require("../../Controllers/index")

//-----Users API----//
router.post("/signup",UserController.create);
router.get("/user/:id",UserController.getById);
router.post("/signin",UserController.SignIn)


module.exports=router;