import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Login from "./pages/Authentication/Login";
import PrivateRoute from "./utils/PrivateRoute";
import RegisterAndLogout from "./pages/Authentication/RegisterAndLogout";
import Logout from "./pages/Authentication/Logout";
import Profile from "./pages/User/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <RegisterAndLogout /> },
      { path: "logout", element: <Logout /> },
      { path: "products", element: <Products /> },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
