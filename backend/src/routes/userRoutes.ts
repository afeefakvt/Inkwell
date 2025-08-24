import { Router } from "express";
import { register,login,refreshAccessToken,logout, updateProfile, changePassword } from "../controllers/userController";
import { authToken } from "../middlewares/authToken";
import { authorizeRoles } from "../middlewares/authRole";

const userRouter = Router()
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/refreshToken',refreshAccessToken);
userRouter.post('/logout',logout);
userRouter.put('/profile',authToken,authorizeRoles(['user']), updateProfile);
userRouter.put('/changePassword',authToken, authorizeRoles(['user']), changePassword);

export default userRouter