import { useState } from "react";
import { FiSend, FiZap } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatArea({
  conversa,
  mensagensPorConversa,
  setMensagensPorConversa,
  setConversas,
  diminuirSaldo,
  saldo,
}) {
  const [novaMensagem, setNovaMensagem] = useState("");
  const [usarZap, setUsarZap] = useState(false);

  if (!conversa) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[200px] bg-zinc-600">
        <img
          className="max-w-full max-h-full object-contain"
          src="/logo.png"
          alt="Logo"
        />
      </div>
    );
  }

  const mensagens = mensagensPorConversa[conversa.id] || [];

  const enviarMensagem = () => {

    if (novaMensagem.trim() === "") return;

    const horarioAtual = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nova = {
      texto: novaMensagem,
      id: Date.now(),
      horario: horarioAtual,
      usarZap: usarZap,
    };

    setMensagensPorConversa((prev) => ({
      ...prev,
      [conversa.id]: [...(prev[conversa.id] || []), nova],
    }));

    setConversas((prevConversas) =>
      prevConversas.map((c) =>
        c.id === conversa.id ? { ...c, tempo: horarioAtual } : c
      )
    );

    setNovaMensagem("");

    if (diminuirSaldo) {
      diminuirSaldo(usarZap ? 0.50 : 0.25);
    }
  };

  const toggleZap = () => {
    setUsarZap((prev) => !prev);
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 bg-zinc-600">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        <div className="bg-zinc-800 w-fit max-w-[90%] rounded-lg px-3 py-2 text-white text-sm sm:text-base flex">
          <strong className="block sm:inline mr-1">{conversa.nome}:</strong>{" "}
          {conversa.texto}
          <p className="text-xs ml-4 pt-1.5 ">{conversa.tempo}</p>
        </div>

        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`self-end w-fit max-w-[90%] rounded-lg px-3 py-2 text-white text-sm sm:text-base flex
              ${msg.usarZap ? "bg-yellow-600" : "bg-green-700"}`}
          >
            {msg.texto}
            <p className="text-xs ml-4 pt-1.5">{msg.horario}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          placeholder={
            saldo === 0 ? "Saldo zerado. Você não pode enviar mensagens." : `Mensagem para ${conversa.nome}...`
          }
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          className="w-full sm:flex-1 p-3 text-sm sm:text-base outline-none rounded-2xl bg-zinc-800 text-white disabled:opacity-50"
          disabled={saldo === 0}
          onKeyDown={(e) => {
            if (e.key === "Enter") enviarMensagem();
          }}
        />
        <div className="flex gap-2 justify-end sm:justify-start">
          <button
            onClick={toggleZap}
            className={`p-3 rounded-2xl transition-colors ${
              usarZap ? "bg-green-600 text-white" : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
            title="Gasto: 0.50"
            disabled={saldo === 0}
          >
            <FiZap />
          </button>
          <button
            onClick={enviarMensagem}
            disabled={saldo === 0}
            className={`p-3 rounded-2xl transition-colors ${
              saldo === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
            title="Enviar mensagem"
          >
            <FiSend />
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default ChatArea;