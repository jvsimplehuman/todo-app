import { FilterType, Todo } from '@/types';

export const contains = (item: Todo, search: string) =>
  item.title.toLowerCase().includes(search.toLowerCase()) ||
  item.description.toLowerCase().includes(search.toLowerCase());

export const isOfType = (item: Todo, filter: FilterType) =>
  filter === FilterType.All ||
  (filter === FilterType.Completed && item.isCompleted) ||
  (filter === FilterType.Active && !item.isCompleted);
