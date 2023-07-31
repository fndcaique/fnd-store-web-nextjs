import classNames from 'classnames';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export default function Input(props: InputProps) {
  const { className, error, ...restProps } = props;
  const inputProps = {
    ...restProps
  };

  return (
    <input
      className={classNames(
        'px-3 py-2 rounded bg-neutral-1 text-neutral text-lg border-none outline-none',
        'focus:shadow-app focus:shadow-accent-3 focus:border focus:border-accent',
        { 'shadow-app shadow-danger-3 border border-danger': error },
        className
      )}
      {...inputProps}
    />
  );
}
