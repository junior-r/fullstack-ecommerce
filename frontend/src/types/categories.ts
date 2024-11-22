export type Categories = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Category[];
};

export type Category = {
  created_at: Date;
  name: string;
  pk: string;
  updated_at: Date;
};
