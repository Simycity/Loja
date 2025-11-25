import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Importando o icone de login
import { BsSearch } from "react-icons/bs";

// importacao do hook para buscar os Funcionarios
import { useListaUsuarios, useDeletaUsuario } from "../../hooks/useUsuarios";

import { Link } from "react-router-dom";

const VerFuncionarios = () => {
  // variavel para armazenar os Funcionarios, que veio do hook
  const funcionarios = useListaUsuarios();

  // importanto a funcao de deletar Funcionario
  const { deletarUsuario } = useDeletaUsuario();

  // Funcao para requisitar a exclusao do Funcionario
  const handleDelete = async (idFuncionario) => {
    // Deletando Funcionario utilizando o hook de deletar Funcionario
    // passando o id do Funcionario específico
    const deletado = await deletarUsuario(idFuncionario);
    console.log(deletado);
    alert(`Funcionario deletado com sucesso!`);

    window.location.reload(); // Atualiza a página após a exclusão

  };
  
  return (
     <div className="min-vh-100 d-flex flex-column justify-content-start p-3 ">
      <h1 className="text-center"> Ver Funcionários </h1>
      <div className="w-50 mx-auto ">
        <InputGroup className="mb-3">
          <Form.Control placeholder="Procure um funcionário" />
          <Button variant="primary" id="botao-filtrar">
            <BsSearch /> Pesquisar
          </Button>
        </InputGroup>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((func) => (
            <tr key={func.id}>
              <td>{func.id}</td>
              <td>{func.nome}</td>
              <td>{func.email}</td>
              <td>{func.senha}</td>
              <td>{func.tipo}</td>
              <td>
                <Button
                  as={Link}
                  to={`/funcionarios/editar/${func.id}`}
                  size="sm"
                  variant="warning"
                  className="mx-2"
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="mx-2"
                  onClick={() => handleDelete(func.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default VerFuncionarios