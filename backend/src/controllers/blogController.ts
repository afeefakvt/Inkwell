import { Blog } from "../models/blog"
import { Request,Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AuthRequest } from "../middlewares/authToken";


export const getAllBlogs = async(req:Request,res:Response):Promise<void>=>{
    try {
        const blogs = await Blog.find({isBlocked:false}).populate("author","name email").sort({createdAt:-1});
        res.status(HTTP_STATUS.OK).json({message:"Blogs fetched successfully",blogs})
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Failed to fetch posts",error});
        
    }
};


export const addBlog = async(req:AuthRequest,res:Response):Promise<void>=>{
    try {
        const {title,content} = req.body
        const author = req.user?._id

    if (!title || !content || !author) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "All fields are required." });
        return;
      }      
  
        const newBlog = new Blog({
            title,
            content,
            author
        })
        await newBlog.save()
        res.status(HTTP_STATUS.CREATED).json({message:"Blog created",blog:newBlog})
        
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Failed to create blog",error})
        
    }
}



export const getBlogById = async(req:Request,res:Response):Promise<void>=>{
    try {
        const {blogId} = req.params
        const blog = await Blog.findById(blogId).populate("author","name email")
        if(!blog){
            res.status(HTTP_STATUS.NOT_FOUND).json({message:"blog details not found"})
            return
        }
        res.status(HTTP_STATUS.OK).json({message:"blog details fetched successfully",blog});
        return;
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
        
    }
};


export const getUserBlogs = async(req:AuthRequest,res:Response):Promise<void>=>{
    try {
        const userId = req.user?._id
        const blogs = await Blog.find({author:userId}).populate("author","name")
        res.status(HTTP_STATUS.OK).json({message:"User blogs fetched successfully",blogs})
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})

    }
};


export const updateBlog = async(req:AuthRequest,res:Response):Promise<void>=>{
    try {
        const {blogId} = req.params;
        const {title,content} = req.body;

        if (!req.user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
            return;
        }

        const blog = await Blog.findById(blogId)
        if(!blog){
            res.status(HTTP_STATUS.NOT_FOUND).json({message:"Blog not found"})
            return;
        }
        if(title) blog.title = title
        if(content) blog.content = content
        await blog.save()
        res.status(HTTP_STATUS.OK).json({message:"Blog updated successfully",blog})


    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
        
    }
};

export const deleteBlog = async(req:AuthRequest,res:Response):Promise<void>=>{
    try {
        const {blogId} = req.params;
        if (!req.user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
            return;
        }

        const blog = await Blog.findById(blogId)
        if(!blog){
            res.status(HTTP_STATUS.NOT_FOUND).json({message:"Blog not found"})
            return;
        }
        await Blog.findByIdAndDelete(blogId)
        res.status(HTTP_STATUS.OK).json({message:"Blog deleted successfully"})
        
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})

    }
};