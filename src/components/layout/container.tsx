import classNames from 'classnames';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function Container({ className = 'container', children }: Props) {
  return (
    <div
      className={classNames('max-w-screen-xl p-3.5 my-0 mx-auto', className)}
    >
      {children}
    </div>
  );
}
