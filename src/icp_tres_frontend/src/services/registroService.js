import { icp_tres_backend } from "../../../declarations/icp_tres_backend";

// Función para guardar múltiples registros
export const guardarRegistros = async (registros) => {
  try {
    // Guarda todos los registros que se envíen, sin filtrar
    await icp_tres_backend.guardarRegistros(registros);
    console.log(`Guardados ${registros.length} cuadros nuevos.`);
  } catch (error) {
    console.error("Error al guardar registros:", error);
    throw error;
  }
};

// Función para obtener todos los registros
export const obtenerRegistros = async () => {
  try {
    const registros = await icp_tres_backend.obtenerRegistros();

    // Mapear registros existentes para mantener consistencia
    return registros.map((registro) => ({
      token: registro.token || "0",
      name: registro.nombre || "Anónimo",
      color: registro.color.startsWith("#") ? registro.color : `#${registro.color}`,
      dream: registro.sueno || "Sin mensaje",
    }));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    throw error;
  }
};
