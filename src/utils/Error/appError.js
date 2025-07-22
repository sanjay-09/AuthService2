class AppError{

    constructor(name="AppError",message="Something went wrong",statusCode=500,layer){
        this.name=name;
        this.message=message;
        this.statusCode=statusCode
        this.layer=layer;
    }
}
module.exports=AppError;