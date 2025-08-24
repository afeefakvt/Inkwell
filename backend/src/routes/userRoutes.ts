import { Router } from "express";
import { register,login,refreshAccessToken,logout } from "../controllers/userController";

const userRouter = Router()
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/refreshToken',refreshAccessToken);
userRouter.post('/logout',logout);

export default userRouter