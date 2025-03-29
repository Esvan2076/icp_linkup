import { useState } from 'react';
import { icp_tres_backend } from 'declarations/icp_tres_backend';

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
    <main>
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
    </main>
  );
}

export default App;
