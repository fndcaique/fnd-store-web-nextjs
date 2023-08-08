import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

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
      className={twMerge(classNames('input', { error }, className))}
      {...inputProps}
    ></textarea>
  );
}
