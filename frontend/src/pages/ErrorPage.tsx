import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Upps, algo salió mal</h1>
          <p className="py-6">
            {isRouteErrorResponse(error)
              ? `La página a la que estás intentando acceder, no existe ${error.status}`
              : `Ha ocurrido un error ${(error as Error).message}`}
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Ir a inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
