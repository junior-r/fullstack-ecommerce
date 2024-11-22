import { useUserInfoStore } from "src/store/User/profile";
import useGetUser from "./hooks/useGetUser";
import Loader from "@components/Loader";

function Profile() {
  const setUser = useUserInfoStore((state) => state.setUser);
  const { data, isLoading } = useGetUser();
  if (isLoading) {
    return <Loader />;
  }
  setUser(data ?? null);
  return (
    <section className="text-black dark:text-white ">
      {data?.is_superuser ? "Active" : "Inactive"}
    </section>
  );
}

export default Profile;
