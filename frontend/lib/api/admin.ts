import { axiosInstance } from "./axiosInstance";

export const getAllUsers = async()=>{
    try {
        const res = await axiosInstance.get('/admin/users')
        return res.data;
        
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
}


export const updateUserBlock = async(userId:string, data:{isBlocked:boolean})=>{
    try {
        const res = await axiosInstance.put(`/admin/users/${userId}/block`,data)
        return res.data;
        
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
}

export const getAllBlogs = async () => {
  try {
    const res = await axiosInstance.get("/admin/blogs");
    return res.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to fetch blogs");
  }
};

export const updateBlogBlock = async (blogId: string, data: { isBlocked: boolean }) => {
  try {
    const res = await axiosInstance.put(`/admin/blogs/${blogId}/block`, data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to update blog status");
  }
};