import { Outlet } from "react-router";
import Navbar from "@components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <section className="py-4 bg-gray-900 min-h-[calc(100vh-68px)]">
        <Outlet />
      </section>
    </>
  );
}

export default App;
