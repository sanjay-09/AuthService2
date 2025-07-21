const express=require("express");
const router=express.Router();
const {UserController}=require("../../Controllers/index")
const {UserMiddleware}=require("../../Middleware/index")

//-----Users API----//
router.post("/signup",UserMiddleware.userRequestValidator,UserController.create);
router.get("/user/:id",UserController.getById);
router.post("/signin",UserMiddleware.userRequestValidator,UserController.SignIn);
router.get("/isAuthenticated",UserController.isAuthenticated);



module.exports=router;