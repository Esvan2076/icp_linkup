import Input from "../atoms/Input";
import Label from "../atoms/Label";

const InputField = ({ label, type, id, placeholder, value, onChange }) => {
   return (
      <div className="mb-4">
         <Label text={label} htmlFor={id} />
         <Input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
      </div>
   );
};

export default InputField;