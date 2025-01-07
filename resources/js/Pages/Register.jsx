// Pages/Home.jsx
import React, { useState } from 'react';
import "../../css/app.css"; // Certifique-se de que o CSS está configurado corretamente
import { router } from '@inertiajs/react';
import axios from 'axios';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar se todos os campos estão preenchidos
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos');
    }
    // Verificar se a senha e a confirmação de senha coincidem
    else if (password !== confirmPassword) {
      setError('As senhas não coincidem');
    } else {
      axios.post("api/v1/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword
      })
        .then(response => {
            router.visit(response.data.redirect);
            // console.log(sucess)
        }).catch(error => {
          // Se a requisição falhar, você pode pegar o erro aqui
          console.log("Erro:", error.response ? error.response.data : error.message);
        });
      // Aqui você pode adicionar a lógica de registro (API, etc.)
    }
  };

  return (
    <div className='w-screen h-screen bg-slate-600 flex justify-center items-center'>
      <form className='bg-slate-300 p-8 rounded-lg shadow-lg w-96' onSubmit={handleSubmit}>
        <h2 className='text-center text-xl font-semibold mb-4'>Registrar-se</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}

        {/* Campo Nome */}
        <div className='mb-4'>
          <label htmlFor="name" className='block text-sm font-medium'>Digite seu Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 mt-1 border border-gray-300 rounded-md'
            placeholder="Seu Nome Completo"
            required
          />
        </div>

        {/* Campo Email */}
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

        {/* Campo Senha */}
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

        {/* Campo Confirmar Senha */}
        <div className='mb-4'>
          <label htmlFor="confirmPassword" className='block text-sm font-medium'>Confirme sua Senha</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full p-2 mt-1 border border-gray-300 rounded-md'
            required
          />
        </div>
    <a href='/'>Login</a>
        {/* Botão de Envio */}
        <div className='flex justify-center'>
          <button
            type="submit"
            className='w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200'
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
