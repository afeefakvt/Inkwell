import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if(!JWT_ACCESS_SECRET){
    throw new Error("Access token is not defined")
}
if(!JWT_REFRESH_SECRET){
    throw new Error("Rfresh token is not defined")
}

export const generateAccessToken = (payload:object):string=>{    
    return jwt.sign(payload,JWT_ACCESS_SECRET,{expiresIn:"15m"})
}
export const generateRefreshToken = (payload:object):string=>{
    return jwt.sign(payload,JWT_REFRESH_SECRET,{expiresIn:"7d"})
}
export const verifyAccessToken = (token:string)=>{
    try {
        return jwt.verify(token,JWT_ACCESS_SECRET)
    } catch (error) {
        throw new Error("Invalid token")
        
    }
}
export const verifyRefreshToken = (token:string)=>{
    try {
        return jwt.verify(token,JWT_REFRESH_SECRET)
    } catch (error) {
        throw new Error('Invalid Token')
    }
}