const {UserService}=require("../Service/index");

const {successCodes,serverErrorCodes}=require("../utils/error-codes");
const AppError = require("../utils/Error/appError");



const userService=new UserService();

const create=async function(req,res){
    try{
        
        const user=await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(successCodes.CREATED).json({
            data:user,
            status:true,
            message:"successfully created the user",
            err:{}
        })

    }
    catch(err){
       if(err.name==='TypeError'){
        const errObj=new AppError("Interal Code Error","Issue at the controller layer",serverErrorCodes.INTERNAL_SERVER_ERROR,"Controller");
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            status:false,
            message:"not able to create the user",
            err:errObj
        })


       }
        return res.status(err.statusCode).json({
            data:{},
            status:false,
            message:"not able to create the user",
            err:err
        })
    }
}
const getById=async function(req,res){
    try{
        const user=await userService.getUserById(req.params.id);
        return res.status(successCodes.OK).json({
            data:user,
            status:true,
            message:"successfully fetch the user",
            err:{}
        })

    }
    catch(err){
         if(err.name==='TypeError'){
        const errObj=new AppError("Interal Code Error","Issue at the controller layer",serverErrorCodes.INTERNAL_SERVER_ERROR,"Controller");
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            status:false,
            message:"not able to create the user",
            err:errObj
        })


       }
        return res.status(err.statusCode).json({
            data:{},
            status:false,
            message:"not able to fetch the user",
            err:err
        })
    }
}
const SignIn=async function(req,res) {
    try{
        const token=await userService.login(req.body);
        return res.status(successCodes.OK).json({
            data:token,
            status:true,
            message:"fetched the token successfully",
            err:{}
        })

    }
    catch(err){

        if(err.name==='TypeError'){
        const errObj=new AppError("Interal Code Error","Issue at the controller layer",serverErrorCodes.INTERNAL_SERVER_ERROR,"Controller");
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            status:false,
            message:"not able to create the user",
            err:errObj
        })
       }
      
        return res.status(err.statusCode).json({
            data:{},
            status:false,
            message:"Not able to fetch the token",
            err:err
        })
    }
    
}
const isAuthenticated=async function(req,res){
    try{
        const token=req.headers['x-access-token']
        const data=await userService.isAuthenticated(token);
        return res.status(200).json({
            data:data,
            status:true,
            message:"Able to authenticate the user",
            err:{}

        });

    }
    catch(err){
        return res.status(err.statusCode).json({
            data:{},
            success:false,
            message:"Not able to authenticate the user",
            err:err
        })
    }
}
const isAdmin=async function(req,res){
    try{
        const data=await userService.isAdmin(req.params.id);
        return res.status(successCodes.OK).json({
            data:data,
            status:true,
            message:"successfully fetched the details",
            err:{}
        })

    }
    catch(err){
           if(err.name==='TypeError'){
        const errObj=new AppError("Interal Code Error","Issue at the controller layer",serverErrorCodes.INTERNAL_SERVER_ERROR,"Controller");
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            status:false,
            message:"not able to create the user",
            err:errObj
        })
       }
        return res.status(500).json({
            data:{},
            status:"false",
            message:"Error fetching the details",
            err:err.message

        })
    }
}

module.exports={
    create,
    getById,
    SignIn,
    isAuthenticated,
    isAdmin
}