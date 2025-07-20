const {UserService}=require("../Service/index");

const {successCodes}=require("../utils/error-codes");



const userService=new UserService();

const create=async function(req,res){
    try{
        
        const user=await userService.create(req.body);
        return res.status(successCodes.CREATED).json({
            data:user,
            status:true,
            message:"successfully created the user",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"not able to create the user",
            err:{err}
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
        return res.status(500).json({
            data:{},
            status:false,
            message:"not able to fetch the user"
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

        return res.status(500).json({
            data:{},
            status:false,
            message:"Not able to fetch the token",
            err:err.err.message || "something went wrong"
        })
    }
    
}

module.exports={
    create,
    getById,
    SignIn
}