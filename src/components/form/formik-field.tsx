import { FormikValues } from 'formik';
import { ComponentType } from 'react';
import Input from './input';

export type FormikFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  helperText?: string;
  component?: string | ComponentType<object>;
  formik: FormikValues;
  counter?: boolean;
};

export default function FormikField(props: FormikFieldProps) {
  const {
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
    <div className='flex flex-col gap-1 w-full'>
      {label && id && (
        <label htmlFor={id} className='text-sm'>{`${label}:`}</label>
      )}
      <div className='flex flex-col relative'>
        <InputComponent
          id={id}
          {...inputProps}
          {...restProps}
          error={hasError}
        />
        {counter && (
          <span className='text-neutral-3 text-xs absolute top-[calc(100%+0.25rem)] right-0'>
            {formik.values[id].length}
            {maxLength && `/${maxLength}`}
          </span>
        )}
      </div>
      {hasError && (
        <span className='text-danger text-xs'>
          {formik.errors[id]?.toString()}
        </span>
      )}
      {helperText && (
        <span className='text-neutral-3 text-xs'>{helperText}</span>
      )}
    </div>
  );
}
