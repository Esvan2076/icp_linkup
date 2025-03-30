import Header from "../templates/header";
import Footer from "../templates/footer";
import { useMentors } from "../../hooks/useMentors";
import defaultAvatar from "/src/assets/foto.png";
import { useState } from "react";

const MentorPage = () => {
  const { mentors, loading, error } = useMentors();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeMentor, setActiveMentor] = useState(null);

  const toggleChat = (mentor) => {
    setActiveMentor(mentor);
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-base-100">
        {/* Encabezado */}
        <section className="py-16 bg-primary text-primary-content">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mentores Disponibles
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Conecta con expertos dispuestos a compartir su conocimiento y
              experiencia contigo
            </p>
          </div>
        </section>

        {/* Cargando */}
        {loading && (
          <div className="container mx-auto px-4 py-12 text-center">
            <progress className="progress progress-primary w-56"></progress>
            <p className="mt-4">Cargando mentores...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="container mx-auto px-4 py-12">
            <div className="alert alert-error shadow-lg">
              <span>Error al cargar los mentores: {error}</span>
            </div>
          </div>
        )}

        {/* Mostrar mentores */}
        {!loading && !error && (
          <section className="container mx-auto px-4 py-8">
            {mentors.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No hay mentores disponibles
                </h3>
                <p className="mt-1 text-gray-500">
                  Intenta nuevamente más tarde.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  >
                    <figure className="px-6 pt-6">
                      <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={defaultAvatar}
                            alt={`Foto de ${mentor.nombre}`}
                          />
                        </div>
                      </div>
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">{mentor.nombre}</h2>
                      <div className="badge badge-primary">{mentor.edad} años</div>
                      <p className="font-semibold text-primary">
                        {mentor.areaEspecializacion}
                      </p>
                      <p className="text-sm">{mentor.sobreMi}</p>
                      <div className="card-actions mt-4">
                        {mentor.sitioWeb && (
                          <a
                            href={mentor.sitioWeb}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                          >
                            Visitar sitio web
                          </a>
                        )}
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => toggleChat(mentor)}
                        >
                          Contactar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Chat */}
        {isChatOpen && activeMentor && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="w-full max-w-md bg-base-100 rounded-lg shadow-2xl overflow-hidden flex flex-col"
              style={{ height: "80vh" }}
            >
              {/* Encabezado del chat */}
              <div className="bg-primary text-primary-content p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={defaultAvatar}
                        alt={`Foto de ${activeMentor.nombre}`}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{activeMentor.nombre}</h3>
                    <p className="text-xs opacity-80">
                      {activeMentor.areaEspecializacion}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleChat(null)}
                  className="btn btn-circle btn-ghost btn-sm"
                  aria-label="Cerrar chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Área de mensajes */}
              <div className="flex-1 p-4 overflow-y-auto bg-base-200 space-y-3">
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={defaultAvatar}
                        alt={`Foto de ${activeMentor.nombre}`}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble bg-primary text-primary-content">
                    Hola, ¿cómo puedo ayudarte a crecer tu negocio?
                  </div>
                </div>

                <div className="chat chat-end">
                  <div className="chat-bubble bg-accent text-accent-content">
                    Hola, estoy buscando mejorar mi estrategia de marketing.
                  </div>
                </div>

                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={defaultAvatar}
                        alt={`Foto de ${activeMentor.nombre}`}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble bg-primary text-primary-content">
                    ¡Claro! Podemos empezar con un análisis de tu mercado y
                    público objetivo.
                  </div>
                </div>
              </div>

              {/* Input de mensaje */}
              <div className="p-3 bg-base-100 border-t border-base-300">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="input input-bordered w-full focus:outline-none"
                  />
                  <button className="btn btn-circle btn-primary btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MentorPage;
