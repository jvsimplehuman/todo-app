import { ChangeEvent, FC } from 'react';
import clsx from 'clsx';
import { PropsWithClassName } from '@/types/utils';
import { FilterType } from '@/types';
import styles from './Filter.module.scss';

type Props = PropsWithClassName<{
  id: string;
  label: string;
  onChange?: (value: string) => void;
}>;

const Filter: FC<Props> = ({ className, id, label, onChange }) => {
  const handleChange = (ev: ChangeEvent) => {
    onChange?.((ev.target as HTMLInputElement).value);
  };

  return (
    <div className={clsx(styles.main, className)}>
      <label htmlFor={id}>{label}</label>
      <select className={styles.input} id={id} name="filter" onChange={handleChange}>
        <option value={FilterType.All}>All</option>
        <option value={FilterType.Completed}>Completed</option>
        <option value={FilterType.Active}>Active</option>
      </select>
    </div>
  );
};

export default Filter;
