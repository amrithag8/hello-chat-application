const jwt=require("jsonwebtoken");

const checkAuth=(req, res, next)=>{
const verifyToken=jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
if(!verifyToken){
    return res.status(400).json({message:"Unauthorized user"});
}
// console.log("authorized from checkAuth",verifyToken );
// console.log("authorized from checkAuth",req.headers.authorization );


req.body.userID=verifyToken.userID;
next();
}

module.exports=checkAuth;