import { useUserInfoStore } from "src/store/User/profile";
import useGetUser from "./hooks/useGetUser";
import Loader from "@components/Loader";
import { BASE_BACKEND_URL } from "src/consts";

function Profile() {
  const setUser = useUserInfoStore((state) => state.setUser);
  const { data, isLoading } = useGetUser();
  if (isLoading) {
    return <Loader />;
  }
  setUser(data ?? null);
  return (
    <section className="text-black dark:text-white ">
      <h1 className="text-2xl">{data?.username}</h1>
      <p>{data?.is_superuser ? "Superuser" : "No Superuser"}</p>
      <p>{data?.is_staff ? "Staff" : "No Staff"}</p>
      <p>{data?.is_active ? "Active" : "Inactive"}</p>
      <img
        src={`${BASE_BACKEND_URL + data?.image}`}
        alt={`Imagen de ${data?.username}`}
      />
    </section>
  );
}

export default Profile;
