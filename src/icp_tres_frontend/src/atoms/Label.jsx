const Label = ({ text, htmlFor }) => {
    return <label htmlFor={htmlFor} className="label pb-1">{text}</label>;
 };
 
 export default Label;