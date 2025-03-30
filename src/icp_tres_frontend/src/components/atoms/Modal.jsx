// src/components/atoms/Modal.jsx
import React from "react";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Fondo con opacidad leve
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
        {children}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-lg font-bold text-gray-700 hover:text-red-500"
        >
          ✖️
        </button>
      </div>
    </div>
  );
};

export default Modal;
