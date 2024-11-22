import { useAuthenticationStore } from "src/store/Categories/authentication";
import Register from "./Register";

function RegisterAndLogout() {
  const clearTokens = useAuthenticationStore((state) => state.clearTokens);
  clearTokens();
  return <Register />;
}

export default RegisterAndLogout;
