import { useState } from "react";
import InputField from "../molecules/InputField";
import Button from "../atoms/Button";

const LoginForm = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      //chamba para ti uwu
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-5">
         <InputField
            label="Correo electrónico"
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />

         <InputField
            label="Contraseña"
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />

         <Button text="Iniciar sesión" onClick={handleSubmit} />
      </form>
   );
};

export default LoginForm;