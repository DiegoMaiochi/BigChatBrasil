import { useState, useEffect } from "react";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mensagensIniciais = {};

function App() {
  const [conversaSelecionada, setConversaSelecionada] = useState(null);
  const [mensagensPorConversa, setMensagensPorConversa] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [conversas, setConversas] = useState([]);
  const [saldo, setSaldo] = useState(10.0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/mensagens")
      .then((res) => res.json())
      .then((data) => {
        setConversas(data);
        setMensagensPorConversa(mensagensIniciais);
      })
      .catch((err) => console.error("Erro ao buscar mensagens:", err));
  }, []);

  useEffect(() => {
    if (saldo === 0) {
      toast.error("Você não pode enviar mensagens. Seus créditos acabaram.");
    }
  }, [saldo]);

  function diminuirSaldo(valor) {
    setSaldo((prev) => {
      const novoSaldo = prev - valor;
      return novoSaldo >= 0 ? Math.round(novoSaldo * 100) / 100 : 0;
    });
  }

  return (
    <div className="flex h-screen">
      {isMobile ? (
        conversaSelecionada ? (
          <div className="flex-1 flex flex-col w-full">
            <Header
              conversa={conversaSelecionada}
              onVoltar={() => setConversaSelecionada(null)}
            />
            <ChatArea
              conversa={conversaSelecionada}
              mensagensPorConversa={mensagensPorConversa}
              setMensagensPorConversa={setMensagensPorConversa}
              setConversas={setConversas}
              diminuirSaldo={diminuirSaldo}
              saldo={saldo}
            />
          </div>
        ) : (
          <Sidebar
            onSelecionarConversa={setConversaSelecionada}
            mensagensPorConversa={mensagensPorConversa}
            conversas={conversas}
            setMensagensPorConversa={setMensagensPorConversa}
            saldo={saldo}
            diminuirSaldo={diminuirSaldo} 
          />
        )
      ) : (
        <>
          <div className="border-r border-zinc-500 hidden sm:block">
            <Sidebar
              onSelecionarConversa={setConversaSelecionada}
              mensagensPorConversa={mensagensPorConversa}
              conversas={conversas}
              setMensagensPorConversa={setMensagensPorConversa}
              saldo={saldo}
              diminuirSaldo={diminuirSaldo} 
            />
          </div>
          <div className="flex-1 flex flex-col">
            <Header conversa={conversaSelecionada} />
            <ChatArea
              conversa={conversaSelecionada}
              mensagensPorConversa={mensagensPorConversa}
              setMensagensPorConversa={setMensagensPorConversa}
              setConversas={setConversas}
              diminuirSaldo={diminuirSaldo}
              saldo={saldo}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
