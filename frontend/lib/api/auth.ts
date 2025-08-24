import { IUser,LoginData } from "@/types/user";
import { axiosInstance } from "./axiosInstance";
import { store } from "@/redux/store";
import { loginSuccess } from "@/redux/userSlice";
import Cookies from "js-cookie";


export const register = async(userData:IUser)=>{
    try {
        const response = await axiosInstance.post('/register',userData)
        return response.data
    } catch (error:any) {
        console.error("Registration API error:", error);
        throw error.response?.data || new Error("Something went wrong");
    }
}

export const login = async(userData:LoginData)=>{
    try {
        const response = await axiosInstance.post('/login',userData)
        const {accessToken} = response.data
        if(accessToken){
            store.dispatch(loginSuccess({
                accessToken,
                user:response.data.user,
                isAuthenticated:true
            }));
            Cookies.set("authToken",accessToken,{expires:15/1440})
        }else{
            console.log("not logged in");

        }
        return response.data;
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
}

export const logoutUser = async()=>{
    try {
        const response = await axiosInstance.post('/logout')
        return response.data

    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

        
    }
}