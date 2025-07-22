const successCodes=Object.freeze({
    OK:200,
    CREATED:201
});
const clientErrorCodes=Object.freeze({
    BAD_REQ:400
})
const serverErrorCodes=Object.freeze({
    INTERNAL_SERVER_ERROR:500

})
module.exports={
    successCodes,
    clientErrorCodes,
    serverErrorCodes
}