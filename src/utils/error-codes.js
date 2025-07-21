const successCodes=Object.freeze({
    OK:200,
    CREATED:201
});
const clientErrorCodes=Object.freeze({
    BAD_REQ:400
})
module.exports={
    successCodes,
    clientErrorCodes
}