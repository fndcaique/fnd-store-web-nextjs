
export default function Input({
  label,
  handleChange,
  id = `id-input-${label}`.toLowerCase(),
  type = 'text',
  name = `${label}`.toLowerCase(),
  ...props
}) {

  const inputProps = {
    id,
    type,
    name,
    ...props,
  };

  return (
    <div className="input-field">
      { label && id && <label htmlFor={ id }>{ `${label}:` }</label> }
      <input
        { ...inputProps }
        onChange={
          handleChange ? ({ target: { value }}) => handleChange(value)
            : props.onChange
        }
      />
    </div>
  );
}
