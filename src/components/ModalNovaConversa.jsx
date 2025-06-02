import { useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { IoClose, IoPerson } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ModalNovaConversa({ onClose }) {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState({});

  const MENSAGEM_OBRIGATORIA = "Preencha o campo obrigatório";

  const renderErro = (campo) =>
    erros[campo] ? (
      <span className="text-red-500 text-sm mb-1 block">{MENSAGEM_OBRIGATORIA}</span>
    ) : null;

  const handleSubmit = () => {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = true;
    if (!numero.trim()) novosErros.numero = true;
    if (!mensagem.trim()) novosErros.mensagem = true;

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      console.log("Dados enviados:", { nome, numero, mensagem });

      toast.success("Mensagem enviada com sucesso!");

      setErros({});
      setNome("");
      setNumero("");
      setMensagem("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-600 p-6 rounded-lg shadow-lg w-96 text-white">
        <ToastContainer />

        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoClose className="text-white text-xl hover:text-red-400" />
          </button>
        </div>

        <div className="text-center flex flex-col gap-3">
          <h2 className="text-xl font-bold mb-2">Nova Mensagem</h2>

          <div>
            {renderErro("nome")}
            <div className={`flex items-center rounded-2xl px-3 bg-zinc-800 ${erros.nome ? "border border-red-500" : ""}`}>
              <IoPerson className="text-xl mr-2 text-zinc-400" />
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-3 text-base outline-none rounded-2xl bg-zinc-800 text-white"
              />
            </div>
          </div>

          <div>
            {renderErro("numero")}
            <div className={`flex items-center rounded-2xl px-3 bg-zinc-800 ${erros.numero ? "border border-red-500" : ""}`}>
              <FaPhoneAlt className="text-xl mr-2 text-zinc-400" />
              <input
                type="number"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full p-3 text-base outline-none rounded-2xl bg-zinc-800 text-white"
              />
            </div>
          </div>

          <div>
            {renderErro("mensagem")}
            <div className={`flex items-center rounded-2xl px-3 bg-zinc-800 ${erros.mensagem ? "border border-red-500" : ""}`}>
              <FaEnvelope className="text-xl mr-2 text-zinc-400" />
              <input
                type="text"
                placeholder="Mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full p-3 text-base outline-none rounded-2xl bg-zinc-800 text-white"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full p-3 mt-2 text-base rounded-2xl bg-green-600 hover:bg-green-700 transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalNovaConversa;