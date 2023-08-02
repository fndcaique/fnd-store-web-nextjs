import classNames from 'classnames';
import { FormikValues } from 'formik';
import { ComponentType } from 'react';
import Input from './input';

export type FormikFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  marker?: boolean;
  name: string;
  helperText?: string;
  component?: string | ComponentType<object>;
  formik: FormikValues;
  counter?: boolean;
};

export default function FormikField(props: FormikFieldProps) {
  const {
    marker,
    label,
    helperText,
    component: InputComponent = Input,
    formik,
    counter = false,
    maxLength,
    ...restProps
  } = props;
  const id = (props.id ?? props.name) as string;
  const inputProps = formik.getFieldProps(id);
  const hasError = Boolean(formik.errors[id] && formik.touched[id]);

  return (
    <div className={classNames('form-control', { marker })}>
      {label && id && (
        <label htmlFor={id} className='label-text'>
          {label}
        </label>
      )}
      <div className='flex flex-col relative'>
        <InputComponent
          id={id}
          {...inputProps}
          {...restProps}
          maxLength={maxLength}
          error={hasError}
        />
        {counter && (
          <span className='text-neutral-3 text-sm absolute top-[calc(100%+0.25rem)] right-0'>
            {formik.values[id].length}
            {maxLength && `/${maxLength}`}
          </span>
        )}
      </div>
      {hasError && (
        <span className='text-danger text-sm'>
          {formik.errors[id]?.toString()}
        </span>
      )}
      {helperText && (
        <span className='text-neutral-3 text-xs'>{helperText}</span>
      )}
    </div>
  );
}
