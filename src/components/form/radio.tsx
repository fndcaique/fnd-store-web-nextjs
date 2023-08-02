import classNames from 'classnames';

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Radio({ label, error, ...inputProps }: RadioProps) {
  return (
    <div className={classNames('form-control marker', { error })}>
      <label>
        <input {...inputProps} type='radio' />
        <div className='input checkmark radio'>
          <div className='filling'></div>
        </div>
        {label && <span className='label-text'>{label}</span>}
      </label>
    </div>
  );
}
