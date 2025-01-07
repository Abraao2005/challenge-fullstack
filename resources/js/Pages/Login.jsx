// Pages/Home.jsx
import React, { useState } from 'react';
import "../../css/app.css"; // Certifique-se de que o CSS está configurado corretamente
import axios from 'axios';
import { router, usePage } from '@inertiajs/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState('');
  const { erro } = usePage().props; // Pegando o erro global
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setApiError(''); // Limpar erro anterior
    } else {
      axios.post("api/v1/login", {
        email: email,
        password: password,
      })
        .then(response => {
          // Se a resposta contiver um erro
          if (response.data.error) {
            setError(response.data.error); // Define o erro vindo da API
          } else {
            const redirect = response.data.redirect;
            router.visit(redirect);
          }
        })
        .catch(error => {
          // Se a requisição falhar, você pode pegar o erro aqui
        });
    }
  };

  return (
    <div className='w-screen h-screen bg-slate-600 flex justify-center items-center'>
      <form className='bg-slate-300 p-8 rounded-lg shadow-lg w-96' onSubmit={handleSubmit}>
        <h2 className='text-center text-xl font-semibold mb-4'>Login</h2>

        {/* Exibindo erros de validação */}
        {error && <p className='text-red-500 text-center'>{erro}</p>}
        {error && <p className='text-red-500 text-center'>{error}</p>}

        
        <div className='mb-4'>
          <label htmlFor="email" className='block text-sm font-medium'>Digite seu Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 mt-1 border border-gray-300 rounded-md'
            placeholder="seuemail@dominio.com"
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="password" className='block text-sm font-medium'>Digite sua Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 mt-1 border border-gray-300 rounded-md'
            required
          />
        </div>
        <a href="/register">Registre-se</a>

        <div className='flex justify-center'>
          <button
            type="submit"
            className='w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200'
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
