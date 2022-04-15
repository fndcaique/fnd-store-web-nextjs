
export default function Input({
  label,
  handleChange,
  id,
  type = 'text',
  ...props }) {

  const inputProps = {
    id, type, ...props,
  };

  return (
    <div className='input-field'>
      { label && id && <label htmlFor={ id }>{ `${label}:` }</label> }
      <input
        { ...inputProps }
        onChange={
          handleChange ? ({ target: { value } }) => handleChange(value)
            : props.onChange
        }
      />
    </div>
  )
}
