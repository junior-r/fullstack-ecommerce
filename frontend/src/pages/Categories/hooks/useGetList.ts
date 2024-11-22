import { useQuery } from "@tanstack/react-query";
import { CategoryListUrl } from "src/consts";
import { usePaginationStore } from "src/store/Categories/pagination";
import { Categories } from "src/types/categories";
import api from "src/utils/api";

export default function useCategories() {
  const page = usePaginationStore((state) => state.page);
  return useQuery({
    queryKey: ["categories", page],
    queryFn: () =>
      api
        .get<Categories>(page ? page : CategoryListUrl)
        .then((response) => response.data)
        .catch((error) => {
          throw new Error(`Failed to load categories ${error}`);
        }),
    staleTime: 1000 * 60 * 5,
  });
}
