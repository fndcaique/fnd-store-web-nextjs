import classNames from 'classnames';

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean;
  };

export default function Textarea(props: TextareaProps) {
  const { className, error, ...restProps } = props;
  const inputProps = {
    ...restProps
  };
  return (
    <textarea
      className={classNames('input', { error }, className)}
      {...inputProps}
    ></textarea>
  );
}
