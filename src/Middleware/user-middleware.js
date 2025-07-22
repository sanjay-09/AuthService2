const {clientErrorCodes}=require("../utils/error-codes")
const userRequestValidator=function(req,res,next){
    console.log(req.body);
    if(!req.body.email||!req.body.password){
        return res.status(clientErrorCodes.BAD_REQ).json({
            data:{},
            status:false,
            message:'either email or password is missing'
        })
    }
    next();
}

const userRolesValidator=function(req,res,next){
    if(!req.params.id){
        return res.status(clientErrorCodes.BAD_REQ).json({
            data:{},
            status:false,
            message:"user id is missing from the request"
        })


    }
    next();
}
module.exports={
    userRequestValidator,
    userRolesValidator
}