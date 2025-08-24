import { Router } from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlogById, getUserBlogs, updateBlog } from "../controllers/blogController";
import { authToken } from "../middlewares/authToken";
import { authorizeRoles } from "../middlewares/authRole";

const blogRouter = Router();

blogRouter.get('/blogs',getAllBlogs);
blogRouter.post('/blogs',authToken,authorizeRoles(["user"]),addBlog);
blogRouter.get('/blogs/:blogId', getBlogById);
blogRouter.get('/myBlogs', authToken,authorizeRoles(["user"]), getUserBlogs);
blogRouter.put('/blogs/:blogId', authToken,authorizeRoles(["user"]),updateBlog);
blogRouter.delete('/blogs/:blogId', authToken,authorizeRoles(['user']), deleteBlog);


export default blogRouter