export type SelectOption = {
  value: string | number;
  label: string;
};

export function Option(props: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...props}></option>;
}
