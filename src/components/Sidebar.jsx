import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TbMessageCirclePlus } from "react-icons/tb";
import ModalNovaConversa from "./ModalNovaConversa";

function Sidebar({
  onSelecionarConversa,
  mensagensPorConversa,
  conversas,
  saldo, 
  
}) {
  const [busca, setBusca] = useState("");
  const [conversaAtiva, setConversaAtiva] = useState(null);
  const [modalNovaConversa, setModalNovaConversa] = useState(false);

  const conversasFiltradas = conversas.filter(
    (msg) =>
      msg.nome.toLowerCase().includes(busca.toLowerCase()) ||
      msg.texto.toLowerCase().includes(busca.toLowerCase()) ||
      msg.numero.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <aside className="w-full sm:w-80 bg-zinc-800 text-white h-screen flex flex-col">
      {modalNovaConversa && (
        <ModalNovaConversa onClose={() => setModalNovaConversa(false)} />
      )}

      <div className="sticky top-0 z-10 bg-zinc-800 p-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">Big Chat Brasil</h3>
            <p className="text-sm font-normal mt-1">Saldo R${saldo.toFixed(2)}</p>
          </div>
          <div
            className="text-4xl cursor-pointer"
            onClick={() => setModalNovaConversa(true)}
          >
            <TbMessageCirclePlus />
          </div>
        </div>

        <nav className="mt-2">
          <ul className="list-none">
            <li className="my-2 cursor-pointer bg-zinc-600 p-2 rounded-full flex items-center gap-2">
              <FiSearch className="text-white text-lg" />
              <input
                className="bg-transparent text-white outline-none w-full"
                type="text"
                placeholder="Buscar..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </li>
          </ul>
        </nav>
      </div>

      <ul className="overflow-y-auto scrollbar-hide px-2 flex-1 space-y-1">
        {conversasFiltradas.map((conversa) => {
          const isSelecionada = conversaAtiva?.id === conversa.id;
          const mensagens = mensagensPorConversa[conversa.id] || [];
          const ultimaMensagem =
            mensagens.length > 0 ? mensagens[mensagens.length - 1].texto : conversa.texto;

          return (
            <li
              key={conversa.id}
              onClick={() => {
                onSelecionarConversa(conversa);
                setConversaAtiva(conversa);
              }}
              className={`p-3 rounded-md flex items-center gap-2 cursor-pointer transition-colors
                ${
                  isSelecionada ? "bg-zinc-600" : "bg-zinc-800 hover:bg-zinc-600"
                }`}
            >
              <img
                src={conversa.img}
                alt={conversa.nome}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-auto">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{conversa.nome}</p>
                  <p className="text-sm text-gray-300 truncate">{conversa.tempo}</p>
                </div>
                <p className="text-sm text-gray-300 truncate">{ultimaMensagem}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
