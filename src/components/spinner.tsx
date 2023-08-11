import classNames from 'classnames';

export type SpinnerProps = {
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
};

export default function Spinner(props: SpinnerProps) {
  const { sm, lg } = props;
  return <div className={classNames('spinner', { sm, lg })}></div>;
}
