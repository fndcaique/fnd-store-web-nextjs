import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className = '', children }: Props) {
  return (
    <div
      className={twMerge(
        classNames('max-w-screen-xl w-full p-3.5 my-0 mx-auto', className)
      )}
    >
      {children}
    </div>
  );
}
