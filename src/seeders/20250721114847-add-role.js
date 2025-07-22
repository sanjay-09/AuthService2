'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   try{
     await queryInterface.bulkInsert('Roles',[{
     name:"ADMIN",
     createdAt:new Date(),
     updatedAt:new Date()
   },{
    name:"CUSTOMER",
     createdAt:new Date(),
     updatedAt:new Date()
    
   },{
    name:"AIRLINE_BUSINESS",
    createdAt:new Date(),
    updatedAt:new Date()

   }])
   }
   catch(err){
    console.log("error",error);
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
