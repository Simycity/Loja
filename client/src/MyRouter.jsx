import { createBrowserRouter } from "react-router-dom";

//Importação das páginas
import App from "./App.jsx";
import RotasProtegidas from "./pages/RotasProtegidas.jsx";
import PaginaErro from "./pages/PaginaErro.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

// Páginas produto
import CadastrarProduto from "./pages/Produtos/CadastrarProduto.jsx";
import EditarProduto from "./pages/Produtos/EditarProduto.jsx";
import VerProdutos from "./pages/Produtos/VerProdutos.jsx";

// Páginas usuário
import CadastrarFuncionario from "./pages/Funcionarios/CadastrarFuncionario.jsx";
import EditarFuncionario from "./pages/Funcionarios/EditarFuncionario.jsx";
import VerFuncionarios from "./pages/Funcionarios/VerFuncionarios.jsx";

// Páginas usuário
import CadastrarCliente from "./pages/Clientes/CadastrarCliente.jsx";
import EditarCliente from "./pages/Clientes/EditarCliente.jsx";
import VerClientes from "./pages/Clientes/VerClientes.jsx";

//Páginas pedidos
import CadastrarPedido from "./pages/Pedidos/CadastrarPedido.jsx";
import VisualizarPedido from "./pages/Pedidos/VisualizarPedido.jsx";
import VerPedidos from "./pages/Pedidos/VerPedidos.jsx";

const router = createBrowserRouter([
   {
    path: "/",
    element: <App />,
    errorElement: <PaginaErro />,
    children: [
      {
        index:true,
        element:<Login />
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
  {
    path: "/",
    element: <RotasProtegidas />,
    errorElement: <PaginaErro />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "produtos",
        children: [
          {
            index: true,
            element: <VerProdutos />,
          },
          {
            path: "cadastrar",
            element: <CadastrarProduto />,
          },
          {
            path: "editar/:id",
            element: <EditarProduto />,
          },
        ],
      },
      {
        path: "clientes",
        children: [
          {
            index: true,
            element: <VerClientes />,
          },
          {
            path: "cadastrar",
            element: <CadastrarCliente />,
          },
          {
            path: "editar/:id",
            element: <EditarCliente />,
          },
        ],
      },
      {
        path: "funcionarios",
        children: [
          {
            index: true,
            element: <VerFuncionarios />,
          },
          {
            path: "cadastrar",
            element: <CadastrarFuncionario />,
          },
          {
            path: "editar/:id",
            element: <EditarFuncionario />,
          },
        ],
      },
      {
        path: "pedidos",
        children: [
          {
            index: true,
            element: <VerPedidos />,
          },
          {
            path: "cadastrar",
            element: <CadastrarPedido />,
          },
          {
            path: "visualizar/:id",
            element: <VisualizarPedido />,
          },
        ],
      },
    ],
  },
]);

export default router;
