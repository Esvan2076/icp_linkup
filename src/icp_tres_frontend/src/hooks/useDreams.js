import { useState, useEffect } from "react";
import { obtenerDreams } from "../services/dreamService";

// Hook para obtener sueños desde el backend
export const useDreams = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener sueños al montar el componente
  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const data = await obtenerDreams();
        setDreams(data);
      } catch (err) {
        setError("Error al cargar los sueños.");
      } finally {
        setLoading(false);
      }
    };

    fetchDreams();
  }, []);

  return { dreams, loading, error };
};
