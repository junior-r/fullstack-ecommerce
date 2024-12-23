import { jwtDecode } from "jwt-decode";
import { useAuthenticationStore } from "src/store/Auth/authentication";
import { AccessToken } from "src/types/accessToken";

export const usePermission = (permission: string) => {
  const accessToken = useAuthenticationStore((state) => state.accessToken);
  if (!accessToken) return false;
  const decoded = jwtDecode(accessToken) as AccessToken;
  return decoded.permissions.includes(permission);
};
