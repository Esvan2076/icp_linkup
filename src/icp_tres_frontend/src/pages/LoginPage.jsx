import LoginForm from "../organisms/LoginForm";
import Header from "../templates/header";

const LoginPage = () => {
   return (
      <div>
         <Header/>
         <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-primary to-accent h-screen">
            <div className="p-8 rounded-lg shadow-lg w-96 bg-base-100">
               <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>
               <LoginForm />
            </div>
         </div>
      </div>

   );
};

export default LoginPage;