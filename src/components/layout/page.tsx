import classNames from 'classnames';

export type PageProps = {
  children?: React.ReactNode;
  className?: string;
};
export default function Page({ children, className }: PageProps) {
  return <div className={classNames('page', className)}>{children}</div>;
}
