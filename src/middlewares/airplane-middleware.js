const { StatusCodes } = require("http-status-codes");

function validateCreateReq(req, res , next){
    if(!req.body.modelNumber){
        res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            data:response,
            error:{message:"property modelNumber is not given correctly or missing"}
        })
    }
    next()
}

module.exports = validateCreateReq