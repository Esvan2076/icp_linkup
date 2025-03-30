import { icp_tres_backend } from "../../../declarations/icp_tres_backend";

export const getMentors = async () => {
   try {
      // Llamada directa al canister
      const mentorsData = JSON.parse(await icp_tres_backend.obtenerMentores());

      // Mapear los datos recibidos para asegurar consistencia
      return mentorsData.map((mentor) => ({
         id: mentor.id,
         nombre: mentor.nombre || "Nombre no disponible",
         areaEspecializacion: mentor.areaEspecializacion || "Área no especificada",
         tiempoRespuesta: mentor.tiempoRespuesta || "No especificado",
         sitioWeb: mentor.sitioWeb || "",
         edad: mentor.edad || "Edad no disponible",
         imagen: mentor.imagenPerfilUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
         sobreMi: mentor.sobreMi || "Sin descripción.",
      }));
   } catch (error) {
      console.error("Error al obtener los mentores desde el canister:", error);
      throw error;
   }
};
