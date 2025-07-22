'use strict';
const {
  Model
} = require('sequelize');

const {SALT}=require("../Config/serverConfig");
const bcrypt=require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     this.belongsToMany(models.Role,{
      through:"User_Roles"
     })
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
         len: [2,10],  
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
   try{
   
     const hashPassword = bcrypt.hashSync(user.password, SALT);
    user.password=hashPassword;
    console.log(hashPassword);
   }
   catch(err){
    console.log(err);
   }
  
});
  return User;
};