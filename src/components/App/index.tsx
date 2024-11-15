import { FC, useMemo, useRef, useState } from 'react';
import { FilterType, Todo } from '@/types';
import { uuid } from '@/utils/uuid';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import Button from '@/components/Button';
import styles from './App.module.scss';
import { contains, isOfType } from '@/utils/todos';

const items: Todo[] = [
  {
    id: uuid(),
    title: 'Learn React',
    description: 'Learn React and build a to-do app',
    isCompleted: true,
  },
  {
    id: uuid(),
    title: 'Learn TypeScript',
    description: 'Learn TypeScript and use with in React',
    isCompleted: true,
  },
  {
    id: uuid(),
    title: 'Apply for CIQ',
    description: 'Apply for CIQ and get a job',
    isCompleted: false,
  },
];

const bySearchText = (search: string) => (item: Todo) => contains(item, search);
const byFilterType = (filter: FilterType) => (item: Todo) => isOfType(item, filter);

const App: FC = () => {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [editingId, setEditingId] = useState<string>();
  const [todos, setTodos] = useState<Todo[]>(items);
  const formWrapper = useRef<HTMLDivElement>();

  const handleAddTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const handleUpdateTodo = (todo: Todo) => {
    setTodos((prev) => prev.map((item) => (item.id === todo.id ? todo : item)));
    setEditingId(undefined);
  };

  const handleDeleteTodo = (todo: Todo) => {
    setTodos((prev) => prev.filter((item) => item.id !== todo.id));
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo.id);
    formWrapper.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilter(FilterType.All);
  };

  const filteredTodos = useMemo(
    () => todos.filter(bySearchText(search)).filter(byFilterType(filter)),
    [todos, filter, search]
  );

  const hiddenItems = todos.length - filteredTodos.length;

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1 className={styles.title}>My to-do list</h1>

        <Filter
          id="filter"
          className={styles.filter}
          label="Filter by"
          onChange={setFilter}
        />
        <Search
          className={styles.search}
          value={search}
          onChange={setSearch}
          label="Find a to-do"
          id="search"
        />
      </div>
      <div className={styles.items} aria-live="polite">
        {items.length > 0 ? (
          <>
            {filteredTodos.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onEdit={handleEditTodo}
                onChange={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
            {hiddenItems ? (
              <p className={styles.message}>
                {hiddenItems} items hidden by filters.{' '}
                <Button onClick={handleResetFilters}>Clear</Button>
              </p>
            ) : null}
          </>
        ) : (
          <p className={styles.message}>Nothing to-do. 🎉</p>
        )}
      </div>

      <div
        ref={(node) => (formWrapper.current = node as HTMLDivElement)}
        className={styles.form}
      >
        <TodoForm
          key={editingId}
          item={todos?.find((item) => item.id === editingId)}
          onSubmit={editingId ? handleUpdateTodo : handleAddTodo}
          onCancel={() => setEditingId(undefined)}
        />
      </div>
    </div>
  );
};

export default App;
