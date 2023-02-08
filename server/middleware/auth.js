const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../model/user");

// auth middleware


exports.verifyToken = async(req, res, next) =>{
    const bearer = req.headers.authorization.split(" ")[1];
            const tokenDecoded = jwt.verify(
                bearer,
                process.env.JWT_SECRET
            )
    console.log("tokenDecoded", tokenDecoded)
    if(tokenDecoded){
        const user = await User.findById(tokenDecoded.userId)
        if(!user) return res.status(401).json('Unathorized');
        req.user = user;
        next()
    }else{
        res.status(401).json('Unathorized')
    }
}


exports.localVariables = (req, res, next) =>{
    req.app.locals = {
        OTP: null,
        resetSession: false,
    }
    next()
}