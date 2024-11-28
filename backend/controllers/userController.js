const mongoose=require("mongoose");
const User=require("../models/userModel");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");


exports.registerUser=async(req, res)=>{
    console.log(req.body);
    const{email, password, fullName}=req.body;
    if(!email||!password||!fullName){
        return res.status(401).json({message:"All fields are required"});
    }
    const isExistEmail=await User.findOne({email});

    if(isExistEmail){
return res.status(401).json({message:"Email already exists"});
    }

    const HashPassword=await bcryptjs.hash(password, 10);
    await User.create({email, password:HashPassword, fullName});

    res.status(200).json({message:"New user created"});
}


exports.userLogin=async(req, res)=>{
    console.log("login", req.body);
    const{email, password}=req.body;
    const isEmailExist=await User.findOne({email});

    if(!isEmailExist){
        return res.status(401).json({message:"Email ID invalid"});
    }

    const comparePass=await bcryptjs.compare(password,isEmailExist.password );

    

    if(comparePass){
        const accessToken= jwt.sign({userID:isEmailExist._id}, process.env.JWT_SECRET_KEY);
        return res.status(200).json({fullName:isEmailExist.fullName, accessToken, userID:isEmailExist._id});
    }
    return res.status(401).json({message:"Password invalid"});

}

exports.searchUser=async(req, res)=>{
    try{
        const userDetails=await User.find();
        const filteredResult=userDetails.filter((user)=>{
           return user.fullName.toLowerCase().includes(req.query.user.toLowerCase())
        })
    
        
        res.status(200).json(filteredResult);
    }
    catch(err){
        console.log(err);
    }
    
    
}