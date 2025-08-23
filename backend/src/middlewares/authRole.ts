import { Request,Response,NextFunction } from "express";
import { AuthRequest } from "./authToken";

export const authorizeRoles = (roles:string[]) => {
  return (req:AuthRequest, res:Response, next:NextFunction) => {
    if(!req.user || !roles.includes(req.user.role)){
        res.status(403).json({message:"Access denied. No permissions."})
        return;
    }
    next();
  };
};