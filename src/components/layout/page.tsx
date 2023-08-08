import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export type PageProps = {
  children?: React.ReactNode;
  className?: string;
};
export default function Page({ children, className }: PageProps) {
  return (
    <div className={twMerge(classNames('page', className))}>{children}</div>
  );
}
