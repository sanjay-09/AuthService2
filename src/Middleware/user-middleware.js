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
module.exports={
    userRequestValidator
}