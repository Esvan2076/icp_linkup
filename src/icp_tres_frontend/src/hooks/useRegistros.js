import { useState, useEffect } from "react";
import { obtenerRegistros, guardarRegistros } from "../services/registroService";

// Hook para manejar registros
export const useRegistros = () => {
   const [registros, setRegistros] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   // Obtener registros al cargar el componente
   useEffect(() => {
      const fetchRegistros = async () => {
         try {
            const data = await obtenerRegistros();
            setRegistros(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchRegistros();
   }, []);

   // Función para guardar nuevos registros
   const agregarRegistros = async (datos) => {
      try {
         const resultado = await guardarRegistros(datos);
         console.log(resultado);
         setRegistros(await obtenerRegistros()); // Actualizar registros
      } catch (error) {
         setError("Error al guardar registros");
      }
   };

   return { registros, loading, error, agregarRegistros };
};
