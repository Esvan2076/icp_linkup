import { icp_tres_backend } from "../../../declarations/icp_tres_backend";

// Función para obtener los sueños desde el backend
export const obtenerDreams = async () => {
  try {
    const dreams = await icp_tres_backend.obtenerDreams();

    // Mapear los sueños para mantener la estructura correcta
    return dreams.map((dream) => ({
      token: dream.token || "0",
      name: dream.nombre || "Anónimo",
      color: dream.color.startsWith("#") ? dream.color : `#${dream.color}`, // Asegurarse que comience con '#'
      dream: dream.sueno || "Sin mensaje",
    }));
  } catch (error) {
    console.error("Error al obtener sueños:", error);
    throw new Error("Error al obtener sueños.");
  }
};


// Función para guardar un nuevo sueño
export const guardarDream = async (dream) => {
  try {
    const data = [
      {
        token: dream.token || "0",
        nombre: dream.name || "Anónimo",
        color: dream.color.replace("#", ""), // Elimina el '#' para enviar correctamente
        sueno: dream.dream || "Sin mensaje",
      },
    ];

    // Llamada al canister para guardar el nuevo sueño
    const response = await icp_tres_backend.guardarDream(data);
    console.log("Respuesta del backend:", response);
    return response;
  } catch (error) {
    console.error("Error al guardar el sueño:", error);
    throw new Error("Error al guardar el sueño.");
  }
};
