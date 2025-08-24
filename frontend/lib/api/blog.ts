import { axiosInstance } from "./axiosInstance";

export const getBlogs =async ()=>{
    try {
        const response = await axiosInstance.get('/blogs')
        return response.data
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
}

export const publishBlog = async(data:{title:string,content:string})=>{
    try {
        const response = await axiosInstance.post("/blogs",data)
        return response.data
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
};

export const getBlogById = async(blogId:string)=>{
    try {
        const response = await axiosInstance.get(`/blogs/${blogId}`)
        return response.data
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
};


export const updateBlog =async(blogId:string,blogData:FormData)=>{
    try {
        const response = await axiosInstance.put(`/blogs/${blogId}`,blogData)
        return response.data
        
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
};

export const deleteBlog = async(blogId:string)=>{
    try {
        const response = await axiosInstance.delete(`/blogs/${blogId}`);
        return response.data
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
};