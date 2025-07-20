const express=require("express");
const bodyParser=require("body-parser");
const {PORT}=require("./Config/serverConfig");

const apiRouter=require("./Routers/index")

const setUpandStartServer=function(){
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use("/api",apiRouter);

    app.listen(PORT,function(){
       
        console.log("server is listening on the port 3001");
    })

}
setUpandStartServer();
