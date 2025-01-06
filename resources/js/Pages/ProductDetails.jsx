import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

const ProductDetails = ({ product ,user_id}) => {
  const [error, setError] = useState('');
  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div className='w-full h-screen bg-gray-100'>
      <div className='flex justify-between p-4 bg-gray-800 text-white'>
        <div className='text-lg font-semibold'>Detalhes do Produto</div>
      </div>

      <div className='p-4'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <button
            onClick={() => router.visit('/dashboard/' + user_id)}  // Navega de volta ao Dashboard
            className='text-gray-500 hover:text-gray-700 mb-4'
          >
            ← Voltar
          </button>

          <h2 className='text-2xl font-semibold'>{product.name}</h2>
          <p className='mt-2'><strong>Descrição:</strong> {product.description}</p>
          <p className='mt-2'><strong>Preço:</strong> R$ {product.price}</p>
          <p className='mt-2'><strong>Quantidade:</strong> {product.quantity}</p>
          <p className='mt-2'>
            <strong>Status:</strong>
            <span
              className={`inline-block px-3 py-1 rounded-full ${product.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
            >
              {product.isActive ? 'Ativo' : 'Inativo'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
