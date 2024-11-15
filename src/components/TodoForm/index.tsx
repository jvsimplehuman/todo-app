import { ChangeEvent, FC, useState } from 'react';
import type { Todo } from '@/types';
import Button from '@/components/Button';
import styles from './TodoForm.module.scss';
import { uuid } from '@/utils/uuid';

type Props = {
  item?: Todo;
  onSubmit: (todo: Todo) => void;
  onCancel?: () => void;
};

const makeEmptyTodo = (): Todo => ({
  id: uuid(),
  title: '',
  description: '',
  isCompleted: false,
});

const TodoForm: FC<Props> = ({ item, onSubmit, onCancel }) => {
  const [currentItem, setCurrentItem] = useState<Todo>(item ?? makeEmptyTodo());

  const handleTitleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setCurrentItem((prev) => ({ ...prev, title: ev.target.value }));
  };

  const handleDescriptionChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentItem((prev) => ({ ...prev, description: ev.target.value }));
  };

  const isValid =
    currentItem.title.trim() !== '' && currentItem.description.trim() !== '';

  const handleSubmit = () => {
    if (isValid) {
      onSubmit?.(currentItem);
      setCurrentItem(makeEmptyTodo());
    }
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>{item ? 'Edit' : 'Create'} to-do item</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="todo-title">
          Title
        </label>
        <input
          className={styles.input}
          type="text"
          name="title"
          id="todo-title"
          value={currentItem.title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="todo-description">
          Description
        </label>
        <textarea
          className={styles.textarea}
          name="description"
          id="todo-description"
          value={currentItem.description}
          onChange={handleDescriptionChange}
          required
        />
      </div>

      <div className={styles.actions}>
        <Button onClick={handleSubmit} variant="primary" disabled={!isValid}>
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default TodoForm;
