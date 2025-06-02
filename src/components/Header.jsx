import { FiPhone, FiArrowLeft } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

function Header({ conversa, onVoltar }) {
  if (!conversa) {
    return <header />;
  }

  return (
    <header className="bg-zinc-800 p-3 sm:px-5 text-white flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 sm:gap-4">

        <button
          onClick={onVoltar}
          className="block sm:hidden text-2xl text-white mr-2">
          <FiArrowLeft />
        </button>

        <img
          src={conversa.img}
          alt={conversa.nome}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div className="leading-tight">
          <h1 className="text-base sm:text-lg font-medium">{conversa.nome}</h1>
          <p className="text-xs sm:text-sm text-zinc-300">{conversa.numero}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-lg sm:text-xl">
        <FiPhone />
        <HiDotsVertical />
      </div>
    </header>
  );
}

export default Header;
