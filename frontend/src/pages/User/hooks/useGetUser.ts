import { useQuery } from "@tanstack/react-query";
import { useUserInfoStore } from "src/store/User/profile";
import { User } from "src/types/user";
import api from "src/utils/api";

export default function useGetUser() {
  const setUser = useUserInfoStore((state) => state.setUser);
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      api
        .get<User>(`/accounts/profile/`)
        .then((response) => response.data)
        .then((data) => {
          setUser(data);
          return data;
        })
        .catch((error) => {
          throw new Error(`Failed to get user info ${error}`);
        }),
  });
}
