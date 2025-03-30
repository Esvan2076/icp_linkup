import React, { useState, useEffect } from "react";
import { useDreams } from "../../hooks/useDreams";
import { useSaveDream } from "../../hooks/useSaveDream";
import Modal from "../atoms/Modal";

const PixelGrid = ({ rows = 15, cols = 40 }) => {
  const { dreams, loading, error } = useDreams();
  const { saveDream, loading: saving, successMessage, error: saveError } = useSaveDream();

  // Inicializar la cuadrícula con cuadros vacíos
  const [pixels, setPixels] = useState(
    Array.from({ length: rows * cols }).map((_, index) => ({
      token: `${index}`,
      color: "#ffffff",
      name: "",
      dream: "",
    }))
  );

  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPixel, setSelectedPixel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dream: "",
    color: "#ffffff",
  });

  // Estado para el tooltip
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  // Llenar los cuadros desde el backend al cargar
  useEffect(() => {
    if (dreams.length > 0) {
      const updatedPixels = [...pixels];
      dreams.forEach((dream) => {
        const index = parseInt(dream.token, 10); // Convierte el token a número
        if (index < pixels.length) {
          updatedPixels[index] = {
            token: dream.token,
            color: dream.color,
            name: dream.name,
            dream: dream.dream,
          };
        }
      });
      setPixels(updatedPixels);
    }
  }, [dreams]);

  // Abrir modal solo si el cuadro está vacío
  const openModal = (index) => {
    if (pixels[index].color !== "#ffffff") {
      return; // Evitar cambiar si el cuadro ya está lleno
    }
    setSelectedPixel(index);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", dream: "", color: "#ffffff" });
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guardar datos y enviar al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPixels = [...pixels];
    const updatedPixel = {
      token: `${selectedPixel}`,
      name: formData.name || "Anónimo",
      dream: formData.dream || "Sin mensaje",
      color: formData.color.replace("#", ""), // Elimina el '#' antes de enviar
    };

    // Actualizar localmente el cuadro
    newPixels[selectedPixel] = {
      ...updatedPixel,
      color: `#${updatedPixel.color}`, // Volver a agregar el '#' para mostrar
    };
    setPixels(newPixels);

    // Enviar cuadro al backend
    await saveDream(updatedPixel);
    closeModal();
  };

  // Mostrar tooltip al pasar el cursor
  const showTooltip = (e, pixel) => {
    if (pixel.color !== "#ffffff") {
      setTooltip({
        visible: true,
        content: `${pixel.name}: ${pixel.dream}`,
        x: e.clientX + 10,
        y: e.clientY + 10,
      });
    }
  };

  // Ocultar tooltip al salir del cuadro
  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 relative">
      {/* Mostrar mensaje mientras carga */}
      {loading && <p className="text-gray-500">Cargando cuadros...</p>}
      {error && (
        <div className="text-red-500">
          <p>Error al cargar los cuadros: {error}</p>
        </div>
      )}

      {/* Mostrar mensaje de éxito o error al guardar */}
      {saving && <p className="text-blue-500">Guardando sueño...</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {saveError && <p className="text-red-500">{saveError}</p>}

      {/* Cuadrícula de cuadros */}
      <div
        className="grid gap-0.5 bg-neutral-300 p-1 rounded-md shadow-md relative"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {pixels.map((pixel, index) => (
          <div
            key={index}
            className={`w-8 h-8 border border-neutral-400 relative ${
              pixel.color !== "#ffffff"
                ? "cursor-not-allowed hover:brightness-100"
                : "cursor-pointer hover:brightness-125"
            }`}
            style={{ backgroundColor: pixel.color }}
            onClick={() =>
              pixel.color === "#ffffff" ? openModal(index) : null
            }
            onMouseEnter={(e) => showTooltip(e, pixel)}
            onMouseLeave={hideTooltip}
          />
        ))}
      </div>

      {/* Tooltip cerca del cursor */}
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-800 text-white text-xs p-2 rounded-md shadow-lg"
          style={{
            top: `${tooltip.y}px`,
            left: `${tooltip.x}px`,
          }}
        >
          {tooltip.content}
        </div>
      )}

      {/* Modal para agregar información */}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2 className="text-xl font-bold mb-4 text-neutral">
          Configura tu cuadro 🎨
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Tu nombre (opcional)"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="dream"
            placeholder="Tu sueño o mensaje (opcional)"
            value={formData.dream}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between mt-4">
            <button type="submit" className="btn btn-primary">
              Guardar 🎨
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancelar ❌
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PixelGrid;
