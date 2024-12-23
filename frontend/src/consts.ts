export const CategoryBaseUrl = import.meta.env.VITE_API_URL + "/categories/";
export const CategoryListUrl = CategoryBaseUrl;
export const CategoryCreateUrl = CategoryBaseUrl + "create/";
export const CategoryDeleteUrl = (pk: string) =>
  CategoryBaseUrl + `delete/${pk}/`;

export const MAX_FILE_SIZE = 2000000; // -> 2MB in bytes
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
