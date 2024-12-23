import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticationStore } from "src/store/Auth/authentication";
import { useAuth } from "src/hooks/useAuth";

type Props = {
  children: ReactNode;
};

function PrivateRoute({ children }: Props) {
  useAuth(); // Ejecuta la lógica de autenticación
  const isAuthorized = useAuthenticationStore((state) => state.isAuthorized);

  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
