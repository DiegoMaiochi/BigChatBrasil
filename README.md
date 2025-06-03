🚀 Big Chat Brasil 💬 é um app web de chat em tempo real que oferece uma experiência personalizada para usuários Pessoa Física (PF) e Pessoa Jurídica (PJ). Faça login, converse, controle seus créditos e fique conectado!

----------------------------------------------------------------------------------------------------------------------------------------

✨ Funcionalidades Principais
- Login com autenticação por CPF/CNPJ e senha, diferenciando PF e PJ
- Navegação fácil entre login e área de chat com React Router
- Interface responsiva: sidebar, chat e header adaptam para desktop e mobile
- Controle de saldo para envio de mensagens (créditos)
- Suporte a múltiplas conversas e mensagens agrupadas
- Notificações amigáveis com react-toastify

----------------------------------------------------------------------------------------------------------------------------------------

🛠️ Tecnologias Utilizadas
- React (hooks)
- React Router Dom (navegação)
- Tailwind CSS (estilos)
- React Icons (ícones)
- React Toastify (notificações)
- JSON Server (API mock)
- Vite (build e dev server)

----------------------------------------------------------------------------------------------------------------------------------------

🚀 Como Rodar o Projeto Localmente
1. Clone o repositório:
   git clone https://github.com/seu-usuario/big-chat-brasil.git
2. Acesse a pasta do projeto: cd big-chat-brasil
3. Instale as dependências: npm install
4. Inicie o ambiente de desenvolvimento com frontend e backend mock juntos: npm run dev
    - Atenção: O comando acima roda dois servidores simultaneamente:
    - O frontend React (via Vite)
    - O json-server que simula a API no http://localhost:3001
    - Isso é possível graças ao pacote concurrently, que executa os dois scripts ao mesmo tempo.
    - Portanto, não é necessário rodar o comando "npx json-server --watch db.json --port 3001" separadamente!
5. Abra no navegador em: http://localhost:5173

----------------------------------------------------------------------------------------------------------------------------------------
