const Button = ({ text, onClick }) => {
    return (
      <button onClick={onClick} className="btn btn-primary w-full">
        {text}
      </button>
    );
  };
  
 export default Button;