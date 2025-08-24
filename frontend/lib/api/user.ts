import { axiosInstance } from "./axiosInstance";

export const updateProfile = async ( data: { name: string; email: string }) => {
    try {
        const res = await axiosInstance.put('/profile', data)
        return res.data.user;
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        
    }
 
};

export const changePassword = async(data: { currentPassword: string; newPassword: string; confirmNewPassword: string })=>{
    try {
        const res = await axiosInstance.put('/changePassword',data)
        return res.data
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
}


export const getMyBlogs = async()=>{
    try {
        const response = await axiosInstance.get('/myBlogs')
        return response.data
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
}