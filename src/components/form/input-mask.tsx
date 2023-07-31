import { ChangeEvent, useState } from 'react';
import Input, { InputProps } from './input';

export type InputMaskProps = InputProps & {
  mask?: (value: string) => string;
  removeMask?: (value: string) => string;
  value?: string;
};

export default function InputMask({
  mask = (value) => value,
  removeMask = (value) => value,
  ...props
}: InputMaskProps) {
  const [innerValue, setInnerValue] = useState(props.value ?? '');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const unmaskedValue = removeMask(mask(event.target.value));

    if (unmaskedValue !== innerValue) {
      setInnerValue(unmaskedValue);

      if (props.onChange) {
        props.onChange({
          ...event,
          target: { ...event.target, value: unmaskedValue }
        });
      }
    }
  }

  return <Input {...props} onChange={handleChange} value={mask(innerValue)} />;
}
