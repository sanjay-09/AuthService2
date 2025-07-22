
const {User,Role}=require("../models/index");
const ValidationError = require("../utils/Error/validationError");
const ConnectionError=require("../utils/Error/ConnectionError");
const AccessDenied = require("../utils/Error/AccessDenied");
const AppError=require("../utils/Error/appError")
const { serverErrorCodes,clientErrorCodes}=require("../utils/error-codes")

class UserRepository{
    async create(data){
        try{
            const user=await User.create(data);
            return user; 

        }
        catch(err){
           
            if(err.name=='SequelizeValidationError'){
               throw new ValidationError(err,"Repository");
            }
            if(err.name=='SequelizeConnectionRefusedError'){
                throw new ConnectionError(err,"Repository");
            }
            if(err.name=='SequelizeAccessDeniedError'){
                throw new AccessDenied(err,"Repository");
            }
             throw new AppError('Internal Code Error','Issue at the repository layer',serverErrorCodes.INTERNAL_SERVER_ERROR,"Repository");
          }
        

    }

    async getUserById(userId){
        try{
            const user=await User.findByPk(userId,{
                attributes:["email","id"]
            });
            return user;

        }
        catch(err){
            if(err.name=='SequelizeConnectionRefusedError'){
                throw new ConnectionError(err,"Repository");
            }
            if(err.name=='SequelizeAccessDeniedError'){
                throw new AccessDenied(err,"Repository");
            }
             throw new AppError('Internal Code Error','Issue at the repository layer',serverErrorCodes.INTERNAL_SERVER_ERROR,"Repository");
        }
    }
    async getUserByEmail(email){
        try{
            const user=User.findOne({
                where:{
                    email:email
                }
            });
            return user;

        }
        catch(err){
            if(err.name=='SequelizeConnectionRefusedError'){
                throw new ConnectionError(err,"Repository");
            }
            if(err.name=='SequelizeAccessDeniedError'){
                throw new AccessDenied(err,"Repository");
            }
             throw new AppError('Internal Code Error','Issue at the repository layer',serverErrorCodes.INTERNAL_SERVER_ERROR,"Repository");
        }

    }
    async isAdmin(userId){
        try{
            const user=await User.findByPk(userId);
            if(!user){
                throw new AppError("Not Found", "User not found", clientErrorCodes.BAD_REQ, "Repository");
            }
            const adminRole=await Role.findOne({
                where:{
                    name:"ADMIN"
                }
            });

            const data=await user.hasRole(adminRole);
            return data;

        }
        catch(err){
            if(err instanceof AppError){
                throw err;
            }
            if(err.name=='SequelizeConnectionRefusedError'){
                throw new ConnectionError(err,"Repository");
            }
            if(err.name=='SequelizeAccessDeniedError'){
                throw new AccessDenied(err,"Repository");
            }
             throw new AppError('Internal Code Error','Issue at the repository layer',serverErrorCodes.INTERNAL_SERVER_ERROR,"Repository");
        }
    }



}
module.exports=UserRepository;