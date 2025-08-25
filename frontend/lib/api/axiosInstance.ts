import axios from "axios";
import Cookies from "js-cookie";
import { store } from "@/redux/store";
import { loginSuccess, logout } from "@/redux/userSlice";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;


      if (status === 401) {
        store.dispatch(logout());
        Cookies.remove("authToken");
        return Promise.reject(error);
      }
      if (status === 403) {
        if (message === "User is blocked") {
            console.error("User is blocked.");
            alert("Your account has been blocked. Please contact for support.");
            store.dispatch(logout());
            Cookies.remove("authToken");
            return Promise.reject(error); // EXIT immediately, no token refresh
          }
  
          
        if (!error.config._retry) {
          error.config._retry = true;
        }

        try {
          console.log("403 error - trying to refresh token");
          const refreshResponse = await axiosInstance.post("/refreshToken");
          if (!refreshResponse?.data?.token) {
            throw new Error("No new access token recieved");
          }
          const newToken = refreshResponse.data.token;

          console.log("new access token recieved", refreshResponse.data.token);

          store.dispatch(
            loginSuccess({
              accessToken: newToken,
              user: store.getState().auth.user,
              isAuthenticated: true,
            })
          );
              Cookies.set("authToken", newToken, { expires: 15 / 1440 });

          error.config.headers[
            "Authorization"
          ] = `Bearer ${refreshResponse.data.token}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
            console.error("Refresh token invalid or expired", refreshError);
            store.dispatch(logout());
            Cookies.remove("authToken");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
