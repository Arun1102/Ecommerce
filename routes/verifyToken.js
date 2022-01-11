const req = require("express/lib/request");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const authHeader = req.Headers.token;

    if(authHeader){
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err){
                res.status(403).json("token is not valid")
            }else{
                req.user = user;
                next()
            }
        })
    }else{
        return res.status(401).json("you are not authenticated");
    }
}

const verifyTokenAndAuthorization = ()=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = {verifyToken, verifyTokenAndAuthorization} //this curly bracket is used since more function to use at different js.