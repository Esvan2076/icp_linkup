import React, { useState, useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { icp_tres_backend } from "../../declarations/icp_tres_backend";
import { idlFactory } from "../../declarations/internet_identity/internet_identity.did.js";

// Importar componentes
import PixelGrid from "./components/templates/PixelGrid";
import Header from "./components/templates/header";
import Footer from "./components/templates/footer";
import HomePage from "./components/pages/HomePage";

// Obtener el ID del canister desde `.env` o usar manualmente
const canisterId =
  process.env.REACT_APP_CANISTER_ID || "a4tbr-q4aaa-aaaaa-qaafq-cai";

// Configurar el agente HTTP para conectar con el canister
const agent = new HttpAgent({
  host:
    process.env.DFX_NETWORK === "ic"
      ? "https://ic0.app"
      : "http://127.0.0.1:4943",
});

function App() {
  const [principal, setPrincipal] = useState(null); // Principal del usuario autenticado
  const [greeting, setGreeting] = useState(""); // Estado para saludo
  let authClient;

  useEffect(() => {
    initAuth();
  }, []);

  // Inicializar AuthClient y verificar autenticación previa
  const initAuth = async () => {
    authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      const newPrincipal = identity.getPrincipal().toText();
      console.log("Usuario autenticado como:", newPrincipal);
      setPrincipal(newPrincipal);
    } else {
      console.log("Usuario NO autenticado");
    }
  };

  // Iniciar sesión con Internet Identity
  const login = async () => {
    authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.internetcomputer.org/",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const newPrincipal = identity.getPrincipal().toText();
        console.log("Autenticado como:", newPrincipal);
        setPrincipal(newPrincipal);
      },
    });
  };

  // Manejar envío del saludo
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;

    // Llamada al backend usando `greet`
    const greeting = await icp_tres_backend.greet(name);
    setGreeting(greeting);
    console.log("Saludo recibido:", greeting);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <Header />

      {/* Verificación de autenticación */}
      <div className="flex flex-col items-center gap-8 my-12">
        {!principal ? (
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4 flex items-center justify-center gap-2">
              🔒 Autenticación requerida
            </h2>
            <p className="text-gray-600 mb-6">
              Conéctate para desbloquear todas las funcionalidades.
            </p>
            <button
              onClick={login}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              🚀 Iniciar sesión con Internet Identity
            </button>
          </div>
        ) : (
          <div className="bg-green-50 shadow-2xl rounded-2xl p-8 w-96 text-center border border-green-300 hover:shadow-3xl transition-shadow duration-300">
            <p className="text-lg text-green-700 mb-4 flex items-center justify-center gap-2">
              ✅ Autenticado como:{" "}
              <span className="font-bold text-green-800 break-all">
                {principal}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Componente HomePage */}
      <HomePage />

      {/* PixelGrid solo si está autenticado */}
      {principal && <PixelGrid rows={15} cols={40} />}

      {/* Mostrar el saludo si existe */}
      {greeting && (
        <p className="mt-4 text-lg font-bold text-green-600">{greeting}</p>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
