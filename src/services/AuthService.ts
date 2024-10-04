import axios from "axios";

// Tạo một axios instance
const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export const login = async (email: string, password: string) => {
    try {
        const res = await api.post("/auth/login", {
        email,
        password,
        }, {
            header: {
                "Content-Type": "application/json",
            }
        });
    
        return res;
    } catch (error) {
        throw error;
    }
    };

const refreshAccessToken = async () => {
    try {
        const res = await api.post("/api/auth/refresh-token");
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Thêm interceptor cho response
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Nếu nhận mã lỗi 401, gọi hàm làm mới token
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            
            await refreshAccessToken();

            // Gửi lại yêu cầu gốc
            return api(originalRequest);
        }

        return Promise.reject(error); // Nếu không phải 401, trả về lỗi
    }
);

export default api;