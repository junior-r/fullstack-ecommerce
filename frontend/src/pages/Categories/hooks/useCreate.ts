import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryCreateUrl } from "src/consts";
import { usePaginationStore } from "src/store/Categories/pagination";
import { Categories, Category } from "src/types/categories";
import api from "src/utils/api";

export default function useCreate() {
  const queryClient = useQueryClient();
  const page = usePaginationStore((state) => state.page);
  return useMutation({
    mutationFn: (category: { pk: string; name: string }) =>
      api
        .post<Category>(CategoryCreateUrl, { name: category.name })
        .then((response) => response.data),
    onSuccess: (savedObject, newObject) => {
      queryClient.setQueryData<Categories>(
        ["categories", page],
        (categories = {} as Categories) => ({
          ...categories,
          results: categories.results.map((category) =>
            category.pk === newObject.pk ? savedObject : category
          ),
        })
      );
      queryClient.invalidateQueries({ queryKey: ["categories", page] });
    },
  });
}
