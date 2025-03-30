import { useState } from 'react';
import { icp_tres_backend } from 'declarations/icp_tres_backend';

// Importa el componente PixelGrid
import PixelGrid from "./templates/PixelGrid";
import Header from "./templates/header";
import Footer from './templates/footer';
import HomePage from "./pages/HomePage";

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    icp_tres_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <div>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
