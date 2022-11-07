
const Button = ({ children, ...restProps }) => {
  return (
    <div className="btn-container">
      <button { ...restProps }>{ children }</button>
    </div>
  );
};

export default Button;
