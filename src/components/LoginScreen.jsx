import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import App from "../App";

function LoginScreen () {
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3001/usuarios?documento=${documento}&senha=${senha}&tipo=${tipo}`);
    const data = await res.json();

    if (data.length > 0) {
        navigate("/app");
    } else {
      alert("Credenciais inválidas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800 p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl text-white">
        <h1 className="text-2xl font-bold text-center mb-6">Big Chat Brasil</h1>
        <form onSubmit={handleLogin}>
          <label className="block text-sm font-medium mb-1">
            Tipo de Pessoa
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="tipo"
                value="pf"
                className="accent-yellow-500"
                onChange={(e) => setTipo(e.target.value)}
              /> PF
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="tipo"
                value="pj"
                className="accent-yellow-500"
                onChange={(e) => setTipo(e.target.value)}
              /> PJ
            </label>
          </div>

          <label className="block text-sm font-medium mb-1 mt-3">Documento</label>
          <div className="flex items-center rounded-2xl px-3 bg-zinc-800">
            <IoPerson className="text-xl text-zinc-400" />
            <input
              type="number"
              placeholder="Digite o CPF ou CNPJ"
              className="w-full p-3 text-base outline-none rounded-2xl bg-transparent"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
            />
          </div>

          <label className="block text-sm font-medium mb-1 mt-3">Senha</label>
          <div className="flex items-center rounded-2xl px-3 bg-zinc-800">
            <MdLock className="text-xl text-zinc-400" />
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full p-3 text-base outline-none rounded-2xl bg-transparent"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full mt-6 bg-green-600 p-2 rounded-xl hover:bg-green-700"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
