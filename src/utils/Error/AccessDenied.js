const AppError=require("./appError");

class AccessDenied extends AppError{
    constructor(err,layer){
       const name=err.name;
      const explanation=err.parent.sqlMessage;
      super(name,explanation,500,layer);
       
    }

}
module.exports=AccessDenied;