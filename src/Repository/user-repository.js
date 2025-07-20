const {User}=require("../models/index")
class UserRepository{
    async create(data){
        try{
            console.log("repo layer",data);
            const user=await User.create(data);
            return user; 

        }
        catch(err){
            console.log(err);
            throw {err};
        }

    }

    async getUserById(userId){
        try{
            const user=await User.findByPk(userId);
            return user;

        }
        catch(err){
            throw err;
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
            throw err;
        }

    }



}
module.exports=UserRepository;