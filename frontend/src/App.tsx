import { Outlet } from "react-router";
import Navbar from "@components/Navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Navbar />
      <section className="py-4 bg-gray-900 min-h-[calc(100vh-68px)]">
        <Outlet />
        <Toaster />
      </section>
    </>
  );
}

export default App;
