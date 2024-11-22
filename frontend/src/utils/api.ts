import axios from "axios";
import { getAuthenticationStore } from "src/store/Categories/authentication";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Interceptor para solicitudes
api.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken, setAccessToken } =
      getAuthenticationStore();

    // Verificar expiración del token (opcional)
    if (accessToken) {
      const isTokenExpired = (token: string) => {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
      };

      if (isTokenExpired(accessToken)) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/token/refresh/`,
            { refresh: refreshToken }
          );
          setAccessToken(data.access);
          config.headers.Authorization = `Bearer ${data.access}`;
        } catch (err) {
          console.error("Error al renovar el token:", err);
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, setAccessToken } = getAuthenticationStore();

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/token/refresh/`,
            { refresh: refreshToken }
          );
          setAccessToken(data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (err) {
          console.error("Error al renovar el token:", err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
