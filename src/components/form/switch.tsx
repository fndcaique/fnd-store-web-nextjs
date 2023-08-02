export default function Switch({ label }: { label: string }) {
  return (
    <div className='form-control switch'>
      <label>
        <input type='checkbox' />
        <div className='slider'></div>
        <span className='label-text'>{label}</span>
      </label>
    </div>
  );
}
