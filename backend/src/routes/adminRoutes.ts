import express from 'express';
import { getAllUsers,updateBlogBlock,getAllBlogs,updateUserBlockStatus } from '../controllers/adminController';
import { authToken } from '../middlewares/authToken';
import { authorizeRoles } from '../middlewares/authRole';


const adminRouter = express.Router();

adminRouter.get("/users", authToken, authorizeRoles(['admin']), getAllUsers);
adminRouter.put("/users/:userId/block", authToken, authorizeRoles(['admin']), updateUserBlockStatus);
adminRouter.get("/blogs",authToken,authorizeRoles(['admin']),getAllBlogs);
adminRouter.put('/blogs/:blogId/block',authToken,authorizeRoles(['admin']),updateBlogBlock);

export default adminRouter