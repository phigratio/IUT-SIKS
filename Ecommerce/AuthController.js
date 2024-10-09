import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import {redis} from "../lib/redis.js";

const generateToken=(userID)=>{
    const accessToken=jwt.sign({userID},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m",
    })
        const refreshToken=jwt.sign({userID},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d",
    })
    return{accessToken,refreshToken};
};

const storeRefreshToken=async(userID,refreshToken)=>{
    await redis.set('refresh_token:${userId}',refreshToken,"EX",7*24*60*60);
};

const setCookies=(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:15*60*1000,
    });
     res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    });

};


export const signup=async(req, res) => {
    const {email, password, username}=req.body;
    try{
    const userExists= await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:"user already exists"});
    }
    const user=await User.create({username,email,password});

    const {accessToken,refreshToken}=generateToken(user._id);
    await storeRefreshToken(user._id,refreshToken);

    setCookies(res,accessToken,refreshToken);

    res.status(201).json({
        user:{
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        },
        message:"user cerated successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }

};

export const login=async(req, res) => {
    res.send("login ");
};

export const logout=async(req, res) => {
    res.send("logout ");
};