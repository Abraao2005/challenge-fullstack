import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { router, usePage } from '@inertiajs/react';

const Dashboard = ({ user, product }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '', isActive: true });
  const [editProduct, setEditProduct] = useState({ id: null, name: '', description: '', price: '', quantity: '', isActive: true });
  const [error, setError] = useState('');
  const [showAddProductForm, setShowAddProductForm] = useState(false); // Controle para mostrar/ocultar o formulário de adicionar produto
  const [showEditProductForm, setShowEditProductForm] = useState(false); // Controle para mostrar/ocultar o formulário de editar produto

  const addProductFormRef = useRef(null);  // Ref para o formulário de adicionar produto
  const editProductFormRef = useRef(null); // Ref para o formulário de editar produto

  useEffect(() => {
    setProducts(product);
  }, [product]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.description) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    axios.post('/api/v1/products', newProduct)
      .then(response => {
        console.log(response.data);
        setProducts([...products, response.data.product]);
        setNewProduct({ name: '', description: '', price: '', quantity: '', isActive: true });
        setShowAddProductForm(false); // Esconde o formulário após adicionar
      })
      .catch(error => {
        setError('Erro ao adicionar produto');
      });
  };

  const handleEditProduct = (product) => {
    setEditProduct({ id: product.id, name: product.name, description: product.description, price: product.price, quantity: product.quantity, isActive: product.isActive });
    setShowEditProductForm(true); // Exibe o formulário de edição
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!editProduct.name || !editProduct.price || !editProduct.quantity || !editProduct.description) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    axios.put(`/api/v1/products/${editProduct.id}`, editProduct)
      .then(response => {
        setProducts(products.map(product => product.id === editProduct.id ? response.data : product));
        setEditProduct({ id: null, name: '', description: '', price: '', quantity: '', isActive: true });
        setShowEditProductForm(false); // Esconde o formulário após editar
      })
      .catch(error => {
        setError('Erro ao atualizar produto');
      });
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`/api/v1/products/${id}`)
      .then(response => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        setError('Erro ao excluir produto');
      });
  };

  const handleToggleActive = (id) => {
    const product = products.find(p => p.id === id);
    axios.put(`/api/v1/products/${id}`, { ...product, isActive: !product.isActive })
      .then(response => {
        setProducts(products.map(p => p.id === id ? response.data : p));
      })
      .catch(error => {
        setError('Erro ao alterar estado do produto');
      });
  };

  // Fechar formulário quando clicar fora da área do formulário
  const handleClickOutside = (event, formRef, setFormVisibility) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setFormVisibility(false);
    }
  };

  useEffect(() => {
    if (showAddProductForm || showEditProductForm) {
      const handleOutsideClick = (e) => {
        if (showAddProductForm) {
          handleClickOutside(e, addProductFormRef, setShowAddProductForm);
        }
        if (showEditProductForm) {
          handleClickOutside(e, editProductFormRef, setShowEditProductForm);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [showAddProductForm, showEditProductForm]);

  return (
    <div className='w-full h-screen bg-gray-100'>
      <div className='flex justify-between p-4 bg-gray-800 text-white'>
        <div className='text-lg font-semibold'>Dashboard</div>
        <div className='flex items-center'>
          <span className='mr-4'>{user.name}</span>
          <a href="/logout" className='text-red-500'>Sair</a>
        </div>
      </div>

      <div className='p-4'>
        <div className='mb-6'>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className='p-2 border rounded-md w-full max-w-sm'
            placeholder='Pesquise produtos...'
          />
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <div className="mb-4">
          <button
            onClick={() => setShowAddProductForm(true)}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Cadastrar Novo Produto
          </button>
        </div>

        <div className='mb-6'>
          <table className='min-w-full table-auto'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='p-2 text-left'>Nome</th>
                <th className='p-2 text-left'>Preço</th>
                <th className='p-2 text-left'>Status</th>
                <th className='p-2 text-left'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.filter(product => product.name.includes(searchQuery)).map(product => (
                <tr key={product.id} className='border-b'>
                  <td className='p-2'>{product.name}</td>
                  <td className='p-2'>{product.price}</td>
                  <td className='p-2'>
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${product.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
                    >
                      {product.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className='p-2'>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className='text-blue-500 mr-4'
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className='text-red-500 mr-4'
                    >
                      Deletar
                    </button>
                    <button
                      onClick={() => handleToggleActive(product.id)}
                      className={`text-white ${product.active
                        ? 'bg-yellow-500' : 'bg-green-500'} px-3 py-1 rounded-full`}
                    >
                      {product.active ? 'Desativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddProductForm && (
          <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'>
            <div ref={addProductFormRef} className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
              <button
                onClick={() => setShowAddProductForm(false)}
                className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              >
                ×
              </button>
              <h3 className='text-xl font-semibold mb-4'>Cadastrar Novo Produto</h3>
              <form onSubmit={handleAddProduct}>
                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Nome</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Descrição</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Preço</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Quantidade</label>
                  <input
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Status</label>
                  <select
                    value={newProduct.isActive}
                    onChange={(e) => setNewProduct({ ...newProduct, isActive: e.target.value === 'true' })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  >
                    <option value={true}>Ativo</option>
                    <option value={false}>Inativo</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                >
                  Adicionar Produto
                </button>
              </form>
            </div>
          </div>
        )}

        {showEditProductForm && (
          <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'>
            <div ref={editProductFormRef} className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
              <button
                onClick={() => setShowEditProductForm(false)}
                className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              >
                ×
              </button>
              <h3 className='text-xl font-semibold mb-4'>Editar Produto</h3>
              <form onSubmit={handleUpdateProduct}>
                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Nome</label>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Descrição</label>
                  <textarea
                    value={editProduct.description}
                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Preço</label>
                  <input
                    type="number"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Quantidade</label>
                  <input
                    type="number"
                    value={editProduct.quantity}
                    onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium'>Status</label>
                  <select
                    value={editProduct.isActive}
                    onChange={(e) => setEditProduct({ ...editProduct, isActive: e.target.value === 'true' })}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  >
                    <option value={true}>Ativo</option>
                    <option value={false}>Inativo</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                >
                  Atualizar Produto
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
