const {UserRepository}=require("../Repository/index");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const {JWT_KEY}=require("../Config/serverConfig")
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
            throw {err};

        }
    }
    async getUserById(userId){
        try{
            const data=await this.userRepository.getUserById(userId,{
                attributes:['email','id']
            });
            return data;

        }
        catch(err){
            throw err;
        }
    }
    async getUserByEmail(email){
        try{
            const user=await this.userRepository.getUserByEmail(email);
            return user;

        }
        catch(err){
            throw err;
        }
    }
    createToken(user){
        try{
            const token=jwt.sign(user,JWT_KEY,{
                expiresIn:'1d'
            });
            return token;

        }
        catch(err){
            throw err;

        }
    }

    verifyToken(token){
        try{
            const isVerified=jwt.verify(token,JWT_KEY);
            return isVerified;

        }
        catch(err){

        }
    }

    comparePassword(inComingPassword,dbPassword){
        try{
            return bcrypt.compareSync(inComingPassword,dbPassword);

        }
        catch(err){
            throw err;
        }
    }

    async login(data){
        try{
            const user=await this.getUserByEmail(data.email);
       
        
            if(!user){
                throw new Error("please sign in to continue further");

            }
            const passwordChecker=this.comparePassword(data.password,user.password);
            if(!passwordChecker){
                throw new Error("password is incorrect please enter valid password")

            }
            const token=this.createToken({
                email:user.email,
                id:user.id
            });
            return token;


        }
        catch(err){
           
            throw {err};
        }
    }

}
module.exports=UserService;