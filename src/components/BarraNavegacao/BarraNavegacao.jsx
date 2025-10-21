// Importando o css da Barra de navegação
import style from "./BarraNavegacao.module.css";

// Importação dos componentes do bootstrap
import { Nav, Navbar, NavDropdown, Image, Accordion } from "react-bootstrap";

// Importando os links do router
import { NavLink } from "react-router-dom";

// Importar as informações do contexto autenticação de usuário
import { AuthContext } from "../../contexts/UserContext.jsx";
import { useContext } from "react";

// Importação dos ícones
import { BsBoxes } from "react-icons/bs";

const BarraNavegacao = () => {
  // Importar o nome do usuário logado e funcão de logout
  const { usuarioNome, logout } = useContext(AuthContext);

  // Guarda o id do usuário logado
  const idAtual = localStorage.getItem("usuarioId");

  // Guarda a imagem do usuário logado
  const imagemAtual = localStorage.getItem("imagemPerfil");

  // Imagem padrão caso o usuário não tenha uma
  const imagemPadrao =
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png";

  return (
    <div
      classsName="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100 max-vh-100"
      style={{ width: "250px" }}
    >
      Alo
    </div>
  );
};

export default BarraNavegacao;
