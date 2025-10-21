import Container from "react-bootstrap/esm/Container";
import { Outlet, Navigate } from "react-router-dom";

// Importando as informações do contexto autenticação de usuário
import { AuthContext } from "../contexts/UserContext";
import { useContext } from 'react';

const RotasProtegidas = () => {

  const {usuarioNome} = useContext(AuthContext);

  // Pega a variável de usuário nome para saber se tem alguém logado
  if (usuarioNome === "Visitante") {
    return <Navigate to="/login" />
  }

  return (
    <div className="App">
      {/* Barra de navegação fixa na lateral */}
      <div className="position-fixed top-0 start-0 min-vh-100 bg-danger">
        <h1>Usuário Logado:</h1>
        <h1>{usuarioNome}</h1>
      </div>
      {/* Conteúdo principal, dependendo de qual rota está */}
      <div
        className="d-flex flex-column min-vh-100 flx-grow-1 p-2 justify-content-center"
        style={{ marginLeft: "350px" }}
      >
        <Container fluid>
          <h1>Conteúdo principal</h1>
        </Container>
      </div>
    </div>
  );
};

export default RotasProtegidas;
