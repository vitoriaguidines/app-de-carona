import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/simple_endpoint');
      const data = await response.text();
      setMessage(data);

      // Exibir a mensagem no console do navegador
      console.log('Mensagem do servidor:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>React Frontend</h1>
      <button onClick={handleClick}>Get Message from Simple Endpoint</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;