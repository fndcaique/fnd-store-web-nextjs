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
      className={classNames(
        'h-[96px] px-3 py-2 rounded bg-neutral-1 text-neutral text-lg border-none outline-none resize-none',
        'focus:shadow-app focus:shadow-accent-3 focus:border focus:border-accent',
        { 'shadow-app shadow-danger-3 border border-danger': error },
        className
      )}
      {...inputProps}
    ></textarea>
  );
}
