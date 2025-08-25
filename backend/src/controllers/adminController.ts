import { Request,Response } from "express";
import { AuthRequest } from "../middlewares/authToken";
import User from "../models/user";
import { HTTP_STATUS } from "../constants/httpStatus";
import { Blog } from "../models/blog";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find({role:"user"}).select("-password"); 
    res.json({ users });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
  }
};


export const updateUserBlockStatus = async (req: AuthRequest, res: Response) => {
  try {
    
    const { userId } = req.params;
    const { isBlocked } = req.body;       

    const user = await User.findById(userId);
    
    if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "User not found" });

    user.isBlocked = isBlocked;
    await user.save();

    res.json({ message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`, user });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.status(HTTP_STATUS.OK).json({ blogs });
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", error });
  }
};


export const updateBlogBlock = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const { isBlocked } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog)
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Blog not found" });

    blog.isBlocked = isBlocked;
    await blog.save();

    res.json({ message: `Blog ${isBlocked ? "blocked" : "unblocked"} successfully`, blog });
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", error });
  }
};