import { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

const Button: FC<Props> = ({ className, children, variant = 'secondary', ...props }) => (
  <button
    type="button"
    {...props}
    className={clsx(styles.main, styles[variant], className)}
  >
    {children}
  </button>
);

export default Button;
