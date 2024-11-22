export const CategoryBaseUrl = import.meta.env.VITE_API_URL + "/categories/";
export const CategoryListUrl = CategoryBaseUrl;
export const CategoryCreateUrl = CategoryBaseUrl + "create/";
export const CategoryDeleteUrl = (pk: string) =>
  CategoryBaseUrl + `delete/${pk}/`;
