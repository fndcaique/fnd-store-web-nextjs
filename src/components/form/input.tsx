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
      className={classNames('input', { error }, className)}
      {...inputProps}
    />
  );
}
