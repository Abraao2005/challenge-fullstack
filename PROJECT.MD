# **Desafio: Cadastro de Produtos**

Esta documentação contém as informações necessárias para a execução do projeto, incluindo o funcionamento das rotas, as tecnologias utilizadas, e o passo a passo para configuração e utilização.

---

## **Tecnologias Utilizadas**

### **Backend**
- **Laravel**: Framework PHP para a construção da API RESTful.
- **Composer**: Gerenciador de dependências PHP.
- **PHPUnit**: Ferramenta de testes unitários para garantir a qualidade do código.

### **Frontend**
- **ReactJS**: Biblioteca JavaScript para a criação de uma SPA (Single Page Application).
- **Inertia.js**: Ferramenta para integrar o frontend com o backend Laravel.
- **Vite**: Utilizado no Laravel para compilar os arquivos do frontend.

---

## **Funcionalidades Implementadas**

### **API (Backend)**
- CRUD de produtos.
- Autenticação e proteção de rotas restritas.
- Testes unitários no controlador de produtos.

### **SPA (Frontend)**
- Página para listar todos os produtos cadastrados.
- Página de detalhes de um produto específico, acessada a partir da listagem.

---

## **Rotas Disponíveis**

### **Rotas da API (Backend)**
<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Endpoint</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/api/v1/products</code></td>
      <td>Lista todos os produtos.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/v1/products</code></td>
      <td>Cria um novo produto (restrito a usuários autenticados).</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/v1/products/{id}</code></td>
      <td>Exibe os detalhes de um produto específico.</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/api/v1/products/{id}</code></td>
      <td>Atualiza os dados de um produto (restrito).</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td><code>/api/v1/products/{id}</code></td>
      <td>Remove um produto do sistema (restrito).</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/v1/login</code></td>
      <td>Realiza a autenticação do usuário.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/v1/register</code></td>
      <td>Registra um novo usuário.</td>
    </tr>
  </tbody>
</table>

### **Rotas da SPA (Frontend)**
<table>
  <thead>
    <tr>
      <th>Caminho</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>/products</code></td>
      <td>Página que exibe a listagem de produtos.</td>
    </tr>
    <tr>
      <td><code>/product-details/:id</code></td>
      <td>Página de detalhes de um produto específico.</td>
    </tr>
  </tbody>
</table>

---

## **Passo a Passo para Configuração e Execução**

### **Configuração do Backend**

1. **Clone o repositório:**
   - Use o comando abaixo para clonar o repositório no seu ambiente local:
     ```bash
     git clone https://github.com/Abraao2005/challenge-fullstack/
     ```

2. **Acesse o diretório do projeto:**
   - Navegue até o diretório do projeto clonado:
     ```bash
     cd challange-fullstack
     ```

3. **Instale as dependências do backend:**
   - Instale as dependências do Laravel usando o Composer:
     ```bash
     composer install
     ```

4. **Configure o arquivo `.env`:**
   - Copie o arquivo de exemplo `.env.example` para `.env` e edite-o para configurar as informações do banco de dados:
     ```bash
     cp .env.example .env
     ```

5. **Gere a chave da aplicação:**
   - Execute o comando para gerar uma chave única para a aplicação:
     ```bash
     php artisan key:generate
     ```

6. **Configure o banco de dados:**
   - Certifique-se de que o servidor de banco de dados esteja em execução.
   - No arquivo `.env`, ajuste as configurações do banco (nome do banco, usuário, senha, etc.).

7. **Execute as migrações e seeders:**
   - Crie as tabelas e insira dados fictícios no banco:
     ```bash
     php artisan migrate --seed
     ```

8. **Inicie o servidor backend:**
   - Suba o servidor do Laravel para disponibilizar a API:
     ```bash
     php artisan serve
     ```

---

### **Configuração do Frontend**

1. **Instale as dependências do frontend:**
   - No mesmo diretório do projeto, instale as dependências do ReactJS:
     ```bash
     npm install
     ```

2. **Compile os arquivos do frontend:**
   - Execute o seguinte comando para compilar e disponibilizar os ativos do frontend:
     ```bash
     npm run dev
     ```

---

### **Acesse a Aplicação**

1. **Acesse o backend no navegador:**
   - Com o servidor backend rodando, você poderá acessar a aplicação em:
     ```bash
     http://localhost:8000
     ```

2. **Visualize os produtos e interaja com a aplicação:**
   - Acesse as rotas configuradas para listar e visualizar os produtos:
     - `/products`: Listagem de produtos.
     - `/product-details/:id`: Detalhes de um produto específico.

---

## **Testes Unitários**

1. **Execute os testes unitários do backend:**
   - Certifique-se de que o servidor do banco de dados esteja ativo.
   - Utilize o seguinte comando para rodar os testes:
     ```bash
     php artisan test
     ```

2. **Resultados dos testes:**
   - Verifique se os métodos do controlador `ProductController` funcionam conforme esperado.

---

## **Finalizando**

- **Servidor em Execução:** Certifique-se de que o backend (`php artisan serve`) e o frontend (`npm run dev`) estão rodando simultaneamente.
- **Banco de Dados:** O banco de dados deve estar corretamente configurado no arquivo `.env` e o servidor ativo.
- **Acesso às Rotas:** Utilize as rotas mencionadas para interagir com a aplicação.

Com todos os passos seguidos corretamente, a aplicação estará pronta para uso. 🚀
