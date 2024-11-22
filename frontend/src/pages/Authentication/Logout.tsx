import { Navigate } from "react-router-dom";
import { useAuthenticationStore } from "src/store/Categories/authentication";

function Logout() {
  const clearTokens = useAuthenticationStore((state) => state.clearTokens);
  clearTokens();
  return <Navigate to="/login" />;
}

export default Logout;