import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthenticationStore } from "src/store/Categories/authentication";
import api from "src/utils/api";

export const useAuth = () => {
  const token = useAuthenticationStore((state) => state.accessToken);
  const refreshToken = useAuthenticationStore((state) => state.refreshToken);
  const setAccessToken = useAuthenticationStore(
    (state) => state.setAccessToken
  );
  const setIsAuthorized = useAuthenticationStore(
    (state) => state.setIsAuthorized
  );

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // Token expirado, intentar renovarlo
        await refreshAccessToken();
      } else {
        setIsAuthorized(true);
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await api.post("/token/refresh/", {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          setAccessToken(response.data.access);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error al refrescar el token:", error);
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, [token, refreshToken, setAccessToken, setIsAuthorized]);
};
