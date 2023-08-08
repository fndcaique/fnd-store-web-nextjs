import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  accent?: boolean;
  danger?: boolean;
  neutral?: boolean;
  fill?: boolean;
  outline?: boolean;
  clear?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
};

export default function Button(props: ButtonProps) {
  const {
    children,
    primary,
    accent,
    danger,
    sm,
    lg,
    outline,
    clear,
    className,
    ...restProps
  } = props;

  let bgClass = '';
  let textClass = 'text-dark';
  let sizeClass = '';

  if (clear) {
    if (primary) {
      textClass = 'text-primary';
    } else if (accent) {
      textClass = 'text-accent';
    } else if (danger) {
      textClass = 'text-danger';
    } else {
      textClass = 'text-neutral';
    }
    bgClass = 'bg-transparent';
  } else if (outline) {
    bgClass = 'bg-transparent';
    if (primary) {
      textClass = 'text-primary border border-solid border-primary';
    } else if (accent) {
      textClass = 'text-accent border border-solid border-accent';
    } else if (danger) {
      textClass = 'text-danger border border-solid border-danger';
    } else {
      textClass = 'text-neutral border border-solid border-neutral';
    }
  } else {
    if (primary) {
      bgClass = 'bg-primary';
    } else if (accent) {
      bgClass = 'bg-accent';
    } else if (danger) {
      bgClass = 'bg-danger';
    } else {
      bgClass = 'bg-neutral';
    }
  }

  if (sm) {
    sizeClass = 'min-h-[30px] px-2 py-1 rounded';
  } else if (lg) {
    sizeClass = 'min-h-[48px] px-8 py-2 rounded';
  } else {
    sizeClass = 'min-h-[40px] px-4 py-2 rounded';
  }

  return (
    <button
      className={twMerge(
        classNames(
          bgClass,
          textClass,
          sizeClass,
          'text-[1.25rem] leading-[1.25rem]',
          className
        )
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
