export type Todo = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

export const FilterType = {
  All: 'All',
  Completed: 'Completed',
  Active: 'Active',
};

export type FilterType = (typeof FilterType)[keyof typeof FilterType];
