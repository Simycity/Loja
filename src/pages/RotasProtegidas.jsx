import Container from "react-bootstrap/esm/Container";
import { Outlet, Navigate } from "react-router-dom";

const RotasProtegidas = () => {
  // Variável para saber se está logado ou não
  const estaLogado = true;
  // Se não tiver, joga pra tela de login
  if (!estaLogado) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      {/* Barra de navegação fixa na lateral */}
      <div className="position-fixed top-0 start-0 min-vh-100 bg-danger">
        <h1>Barra de navegação</h1>
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
