import { useState } from "react";
import { guardarDream } from "../services/dreamService";

export const useSaveDream = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Función para guardar un sueño
  const saveDream = async (dream) => {
    try {
      setLoading(true);
      setError(null);
      const response = await guardarDream(dream);

      if (response === "Registros guardados correctamente") {
        setSuccessMessage("¡Sueño guardado correctamente!");
      } else {
        setError("Error al guardar el sueño. Intenta nuevamente.");
      }
    } catch (error) {
      setError("Error de conexión al guardar el sueño.");
    } finally {
      setLoading(false);
    }
  };

  return { saveDream, loading, error, successMessage };
};
