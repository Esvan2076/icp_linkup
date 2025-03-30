import { useNavigate } from "react-router-dom";
import { icp_tres_backend } from "../../../../declarations/icp_tres_backend";
import { useState } from "react";

const Header = () => {
   const navigate = useNavigate();
   const [apiStatus, setApiStatus] = useState(null);

   // Función para verificar el estado de la API
   const checkAPIHealth = async () => {
      try {
         const response = await icp_tres_backend.healthCheck(); // Llamada directa
         console.log("Respuesta de la API:", response);
         setApiStatus(response);
      } catch (error) {
         console.error("Error al llamar a la API:", error);
         setApiStatus("Error al conectar con la API");
      }
   };

   return (
      <div className="navbar bg-primary shadow-sm py-4 px-24">
         <div className="flex-1">
            <button
               className="btn btn-primary px-2 sm:px-4"
               onClick={() => navigate("/")}
            >
               <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 text-base-100">
                  LinkUp!
               </h1>
            </button>
         </div>

         <div className="flex-none flex items-center gap-4">

            <button className="btn btn-primary" onClick={() => navigate("/mentores")}>
               Mentores
            </button>

            <button className="btn btn-primary" onClick={() => navigate("/suenos")}>
               Sueños
            </button>

            <button className="btn btn-primary" onClick={() => navigate("/login")}>
               Iniciar sesión
            </button>
         </div>

         {/* Mostrar el estado de la API */}
         {apiStatus && (
            <div className="mt-2 text-white bg-gray-800 p-2 rounded-lg">
               {apiStatus}
            </div>
         )}
      </div>
   );
};

export default Header;
