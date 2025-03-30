import React, { useState, useEffect } from "react";
import Modal from "../atoms/Modal";
import { guardarRegistros, obtenerRegistros } from "../services/registroService";

const PixelGrid = ({ rows = 15, cols = 40 }) => {
  // Estado para la cuadrícula inicial (solo cuadros vacíos)
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

  // Obtener píxeles guardados al cargar la página
  useEffect(() => {
    const fetchPixels = async () => {
      try {
        const registrosGuardados = await obtenerRegistros();

        if (registrosGuardados.length > 0) {
          // Rellenar solo los cuadros guardados
          const newPixels = [...pixels];
          registrosGuardados.forEach((registro) => {
            const index = parseInt(registro.token);
            newPixels[index] = {
              token: registro.token,
              color: registro.color || "#ffffff",
              name: registro.name || "Anónimo",
              dream: registro.dream || "Sin mensaje",
            };
          });
          setPixels(newPixels);
        }
      } catch (error) {
        console.error("Error al obtener los registros:", error);
      }
    };

    fetchPixels();
  }, [rows, cols]);

  // Abrir modal solo si el cuadro está vacío
  const openModal = (index) => {
    if (pixels[index].color !== "#ffffff") {
      return; // Evitar cambiar si el cuadro está lleno
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

  // Guardar datos y actualizar el píxel seleccionado
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPixels = [...pixels];
  
    // Obtener cuadro modificado
    const updatedPixel = {
      token: `${selectedPixel}`, // El token como string
      color: formData.color.startsWith("#") ? formData.color : `#${formData.color}`, // Asegura que tenga #
      name: formData.name || "Anónimo",
      dream: formData.dream || "Sin mensaje",
    };
  
    // Actualizar solo el cuadro seleccionado
    newPixels[selectedPixel] = updatedPixel;
    setPixels(newPixels);
  
    // Guardar el nuevo cuadro
    try {
      await guardarRegistros([updatedPixel]);
      console.log(`✅ Cuadro guardado correctamente en la posición ${selectedPixel}`);
    } catch (error) {
      console.error("❌ Error al guardar el nuevo cuadro:", error);
    }
  
    closeModal();
  };  

  // Mostrar tooltip al pasar el cursor por encima del cuadro
  const showTooltip = (e, pixel) => {
    if (pixel.color !== "#ffffff") {
      setTooltip({
        visible: true,
        content: `${pixel.name}: ${pixel.dream}`,
        x: e.clientX + 15,
        y: e.clientY + 15,
      });
    }
  };

  // Ocultar el tooltip al salir del cuadro
  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 relative">
      {/* Cuadrícula de píxeles */}
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
            onMouseEnter={(e) => pixel.color !== "#ffffff" && showTooltip(e, pixel)}
            onMouseLeave={hideTooltip}
          />
        ))}
      </div>

      {/* Tooltip personalizado */}
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

      {/* Modal para ingresar datos */}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2 className="text-xl font-bold mb-4 text-neutral">Configura tu cuadro 🎨</h2>
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
