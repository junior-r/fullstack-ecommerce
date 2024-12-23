import { NavLink } from "react-router-dom";
import { useAuthenticationStore } from "src/store/Auth/authentication";

type NavItem = {
  name: string;
  url: string;
  show: boolean | ((isAuthorized: boolean) => boolean);
};

const NavItems: NavItem[] = [
  {
    name: "Home",
    url: "/",
    show: true,
  },
  {
    name: "Products",
    url: "/products",
    show: true,
  },
  {
    name: "Categories",
    url: "/categories",
    show: true,
  },
  {
    name: "Login",
    url: "/login",
    show: (isAuthorized: boolean) => !isAuthorized,
  },
  {
    name: "Signup",
    url: "/register",
    show: (isAuthorized: boolean) => !isAuthorized,
  },
  {
    name: "Profile",
    url: "/profile",
    show: (isAuthorized: boolean) => isAuthorized,
  },
  {
    name: "Logout",
    url: "/logout",
    show: (isAuthorized: boolean) => isAuthorized,
  },
];

function Navbar() {
  const isAuthorized = useAuthenticationStore((state) => state.isAuthorized);
  const show = (item: NavItem) => {
    if (typeof item.show === "function") {
      return item.show(isAuthorized);
    }
    return item.show;
  };
  return (
    <>
      <div className="navbar bg-base-100 max-w-screen-xl mx-auto">
        <div className="flex-1">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {NavItems.map((item, idx) =>
                show(item) ? (
                  <li key={idx}>
                    <NavLink to={item.url}>{item.name}</NavLink>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">E-commerce</a>
        </div>
        <div className="hidden lg:flex flex-none">
          <ul className="menu menu-horizontal px-1 space-x-2">
            {NavItems.map((item, idx) =>
              show(item) ? (
                <li key={idx}>
                  <NavLink to={item.url}>{item.name}</NavLink>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
