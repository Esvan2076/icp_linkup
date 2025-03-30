const Input = ({ type, id, placeholder, value, onChange }) => {
    return (
       <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input input-primary w-full"
       />
    );
 };
 export default Input;