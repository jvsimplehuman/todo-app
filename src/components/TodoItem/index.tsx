import { FC } from 'react';
import clsx from 'clsx';
import type { Todo } from '@/types';
import Button from '@/components/Button';
import styles from './TodoItem.module.scss';

type Props = {
  item: Todo;
  onDelete?: (todo: Todo) => void;
  onChange?: (todo: Todo) => void;
  onEdit?: (todo: Todo) => void;
};

const TodoItem: FC<Props> = ({ item, onChange, onEdit, onDelete }) => {
  const handleToggleComplete = () => {
    onChange?.({ ...item, isCompleted: !item.isCompleted });
  };

  const handleDelete = () => {
    onDelete?.(item);
  };

  const handleEdit = () => {
    onEdit?.(item);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggleComplete();
      event.preventDefault();
    }
  };

  return (
    <div
      className={clsx(styles.main, {
        [styles.isCompleted]: item.isCompleted,
      })}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={item.isCompleted}
        onChange={handleToggleComplete}
        aria-labelledby={`todo-item-${item.id}`}
      />
      <div
        className={styles.content}
        id={`todo-item-${item.id}`}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleToggleComplete}
      >
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleEdit} variant="secondary">
          Edit
        </Button>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
