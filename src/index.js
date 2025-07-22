const express=require("express");
const bodyParser=require("body-parser");
const {PORT}=require("./Config/serverConfig");

const apiRouter=require("./Routers/index")
const db=require("./models/index")
const {User,Role}=require("./models");

const setUpandStartServer=function(){
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use("/api",apiRouter);

    app.listen(PORT,async function(){
       
        console.log("server is listening on the port 3001");
        const shouldSync = process.env.DB_SYNC === 'true';
        if(shouldSync){
            db.sequelize.sync({alter:true});

        }
 
 

    })

}
setUpandStartServer();
