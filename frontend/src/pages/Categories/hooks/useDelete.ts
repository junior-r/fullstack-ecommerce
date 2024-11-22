import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryDeleteUrl } from "src/consts";
import { usePaginationStore } from "src/store/Categories/pagination";
import { Categories, Category } from "src/types/categories";
import api from "src/utils/api";

export default function useDelete() {
  const queryClient = useQueryClient();
  const page = usePaginationStore((state) => state.page);
  return useMutation({
    mutationFn: (category: { pk: string }) =>
      api
        .delete<Category>(CategoryDeleteUrl(category.pk))
        .then((response) => response.data),
    onSuccess: (_, deletedObject) => {
      queryClient.setQueryData<Categories>(
        ["categories", page],
        (categories = {} as Categories) => ({
          ...categories,
          results: categories.results.filter(
            (category) => category.pk !== deletedObject.pk
          ),
        })
      );
      queryClient.invalidateQueries({ queryKey: ["categories", page] });
    },
  });
}
