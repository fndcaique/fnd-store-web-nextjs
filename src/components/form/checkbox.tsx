import classNames from 'classnames';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
};

export default function Checkbox({
  label,
  error,
  ...inputProps
}: CheckboxProps) {
  return (
    <div className={classNames('form-control marker', { error })}>
      <label>
        <input {...inputProps} type='checkbox' />
        <div className='input checkmark checkbox'>
          <div className='filling'></div>
        </div>
        {label && <span className='label-text'>{label}</span>}
      </label>
    </div>
  );
}
