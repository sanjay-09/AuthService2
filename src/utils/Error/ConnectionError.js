const AppError=require("./appError");
class ConnectionError extends AppError{
    constructor(err,layer){
        const name=err.name;
        const explantion=`${err.parent.address} refused to connect on port:${err.parent.port}`;
        super(name,explantion,500,layer);

    }
}
module.exports=ConnectionError;