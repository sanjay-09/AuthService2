const {UserRepository}=require("../Repository/index");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const {JWT_KEY}=require("../Config/serverConfig");
const AppError = require("../utils/Error/appError");
const { serverErrorCodes, clientErrorCodes } = require("../utils/error-codes");
class UserService{
    constructor(){
        this.userRepository=new UserRepository();
        
    }

    async create(data){
        try{
            const user=await this.userRepository.create(data);
            return user;

        }
        catch(err){
            if(err.layer==='Repository'){
                throw err;
            }
            throw new AppError("Internal Code Error","Issue at the service layer",serverErrorCodes.INTERNAL_SERVER_ERROR,"Service");

        }
    }
    async getUserById(userId){
        try{
            const data=await this.userRepository.getUserById(userId);
            return data;

        }
        catch(err){
            if(err.layer==='Repository'){
                throw err;
            }
        throw new AppError("Internal Code Error","Issue at the service layer",serverErrorCodes.INTERNAL_SERVER_ERROR,"Service");

        }
    }
    async getUserByEmail(email){
        try{
            const user=await this.userRepository.getUserByEmail(email);
            
            return user;

        }
        catch(err){
                if(err.layer==='Repository'){
                throw err;
            }
        throw new AppError("Internal Code Error","Issue at the service layer",serverErrorCodes.INTERNAL_SERVER_ERROR,"Service");
        }
    }
   

    createToken(data){
        try{
            const token=jwt.sign(data,JWT_KEY,{expiresIn:'1d'});
            return token;
        }
        catch(err){
            throw err;
        }
    }
    verifyToken(token){
        try{
            const data=jwt.verify(token,JWT_KEY);
            return data;

        }
        catch(err){
           if(err.name==='JsonWebTokenError'){
            throw new AppError("JsonWebTokenError","Token is not authenticated",clientErrorCodes.BAD_REQ,"Service")

           }
          

        }
    }
    comparePassword(incomingPassword,dbPassword){
        try{
            return bcrypt.compareSync(incomingPassword,dbPassword);

        }
        catch(err){
            throw err;
        }
    }
    async login(data){
        try{
            const user=await this.getUserByEmail(data.email);
        if(!user){
             throw new AppError("Not Found", "User not found", clientErrorCodes.BAD_REQ, "Service");
        }
        const passwordChecker=this.comparePassword(data.password,user.password);
        if(!passwordChecker){
            throw new AppError("Incorrect Password","Password doesnt match",clientErrorCodes.BAD_REQ,"Service");
        }
        const token=this.createToken({
            email:user.email,
            id:user.id
        });
        
        return token;

        }
        catch(err){
            if(err.layer=='Repository'){
                throw err;
            }
            if(err instanceof AppError){
                throw err;
            }
             throw new AppError('Internal Code Error','Issue at the Service layer',serverErrorCodes.INTERNAL_SERVER_ERROR,"Service");


        }
    }
    async isAuthenticated(token){
        
        try{
            const isTokenValid=this.verifyToken(token);
            if(!isTokenValid){
                throw new AppError("Token_INCORRECT","Token did not match",clientErrorCodes.BAD_REQ,"SERVICE");
            }
            const user=await this.getUserById(isTokenValid.id);
            if(!user){
                  throw new AppError("Not Found", "User not found", clientErrorCodes.BAD_REQ, "Service");
                
            }
            return user.id;


        }
        catch(err){
            if(err.layer=='Repository'){
                throw err;
            }
         if(err instanceof AppError){
            throw err;
            
         }

           throw new AppError('Internal Code Error','Issue at the Service layer',serverErrorCodes.INTERNAL_SERVER_ERROR,"Service");
        }
    }
    async isAdmin(userId){
        try{
            const data=await this.userRepository.isAdmin(userId);
            return data;

        }
        catch(err){
            if(err.layer==="Respository"){
                return err;
            }
           throw new AppError('Internal Code Error','Issue at the Service layer',serverErrorCodes.INTERNAL_SERVER_ERROR,"Service");
        }
    }

}
module.exports=UserService;