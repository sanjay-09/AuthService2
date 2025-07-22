const AppError = require("./appError");

class ValidationError extends AppError{
    constructor(err,layer){
        let name=err.name;
        let explantion=[];
        err.errors.forEach(function(x){
            explantion.push(x.message);
        })
        super(name,explantion,400,layer);
    }
}
module.exports=ValidationError;