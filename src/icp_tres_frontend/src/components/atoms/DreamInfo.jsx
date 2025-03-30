import React from "react";
import { useDreams } from "../../hooks/useDreams";

const DreamInfo = () => {
  const { dreams, loading, error } = useDreams();

  if (loading) {
    return <p className="text-center text-gray-500">Cargando cuadro...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error al obtener los cuadros: {error}</p>
      </div>
    );
  }

  if (dreams.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No hay cuadros disponibles</p>
      </div>
    );
  }

  // Mostrar solo el primer cuadro si hay datos
  const firstDream = dreams[0];

  return (
    <div
      className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg shadow-md w-96"
      style={{ backgroundColor: firstDream.color }}
    >
      <h3 className="text-lg font-bold text-neutral-800">{firstDream.name}</h3>
      <p className="text-sm text-neutral-700">{firstDream.dream}</p>
    </div>
  );
};

export default DreamInfo;
