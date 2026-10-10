import { useState, useEffect } from 'react';
import Header from './components/Header';
import axios from 'axios';

export default function App() {
  const [mensagem, setMensagem] = useState("Carregando status da API...");

  useEffect(() => {
    const buscarStatus = async () => {
      try {
        const resposta = await axios.get('http://127.0.0.1:8000/status');
        setMensagem(resposta.data);
      } catch (erro) {
        console.error("Erro ao conectar na API:", erro);
        setMensagem("Erro ao conectar com o backend.");
      }
    };
    buscarStatus();
  }, []);

  return (
    <div>
      <Header/>
      <h1>Painel do Projeto</h1>
      <div style={{
        background: '#f0f2f5',
        padding: '20px',
        borderRadius: '8px',
        display: 'inline-block',
        marginTop: '20px'
      }}>
        <strong>Status do Backend (via Async/Await):</strong>
        <p>{mensagem}</p>
      </div>
    </div>
  );
}