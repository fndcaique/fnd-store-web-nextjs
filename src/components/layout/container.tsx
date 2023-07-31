import classNames from 'classnames';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className = '', children }: Props) {
  return (
    <div
      className={classNames(
        'max-w-screen-xl w-full p-3.5 my-0 mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
}
