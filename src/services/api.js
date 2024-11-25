import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor vào yêu cầu API
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor vào phản hồi của API
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu mã lỗi là 401 (token hết hạn)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Lấy refreshToken từ localStorage
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Gửi yêu cầu làm mới accessToken
          const response = await instance.post("/auth/refreshtoken", {
            refreshToken: refreshToken,
          });

          const { accessToken } = response.data.accessToken;
          TokenService.updateLocalAccessToken(accessToken); // Lưu accessToken mới vào localStorage

          // Cập nhật lại header Authorization với accessToken mới và retry lại yêu cầu
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          return instance(originalRequest); // Tiến hành lại yêu cầu gốc
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
