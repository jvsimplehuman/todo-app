import { ChangeEvent, FC } from 'react';
import clsx from 'clsx';
import { PropsWithClassName } from '@/types/utils';
import styles from './Search.module.scss';

type Props = PropsWithClassName<{
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
}>;

const Search: FC<Props> = ({ className, id, label, value, onChange }) => {
  const handleChange = (ev: ChangeEvent) => {
    onChange?.((ev.target as HTMLInputElement).value);
  };

  return (
    <div className={clsx(styles.main, className)}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        type="text"
        id={id}
        name="search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
