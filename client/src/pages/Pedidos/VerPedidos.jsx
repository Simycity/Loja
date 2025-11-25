import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Importando o icone de login
import { BsEye, BsSearch } from "react-icons/bs";

// importacao do hook para buscar os clientes
import { useListaPedidos } from "../../hooks/usePedidos";

import { Link } from "react-router-dom";

import { useState } from "react";

const VerPedidos = () => {
  // variavel para armazenar os clientes, que veio do hook
  const pedidos = useListaPedidos();

  // Estados para filtros
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaTipo, setBuscaTipo] = useState("");

  // Filtragem combinada
  const pedidosFiltrados = pedidos.filter((ped) => {
    const nomeCorresponde = ped.clienteNome
      .toLowerCase()
      .includes(buscaNome.toLowerCase());

    const tipoCorresponde = buscaTipo
      ? ped.formaPagamento?.toLowerCase() === buscaTipo.toLowerCase()
      : true;

    return nomeCorresponde && tipoCorresponde;
  });

  return (
    <div>
      <div className="min-vh-100 d-flex flex-column justify-content-start p-3 ">
        <h1 className="text-center"> Ver Pedidos </h1>
        {/* Filtro de busca */}
        <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">
          <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
            <Form.Control
              placeholder="Procure por nome do cliente"
              value={buscaNome}
              onChange={(e) => setBuscaNome(e.target.value)}
            />
            <Button variant="primary" id="botao-filtrar">
              <BsSearch /> Pesquisar
            </Button>
          </InputGroup>

          {/* Filtro por tipo */}
          <DropdownButton
            id="dropdown-categoria"
            title={buscaTipo || "Todas as Formas"}
            variant="secondary"
            className="mb-3"
          >
            <Dropdown.Item onClick={() => setBuscaTipo("")}>
              Todas
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setBuscaTipo("Dinheiro")}>
              Dinheiro
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setBuscaTipo("Crédito")}>
              Crédito
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setBuscaTipo("Débito")}>
              Débito
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setBuscaTipo("Pix")}>
              Pix
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Nome do cliente</th>
              <th>Total</th>
              <th>Forma de Pagamento </th>
              <th>Data</th>
              <th>Hora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map((ped) => (
                <tr key={ped.id}>
                  <td>{ped.id}</td>
                  <td>{ped.clienteNome}</td>
                  <td>R$ {ped.totalFinal}</td>
                  <td>{ped.formaPagamento}</td>
                  <td>{ped.data.split('T')[0].split('-').reverse().join('/')}</td>
                  <td>{ped.hora}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/pedidos/visualizar/${ped.id}`}
                      size="sm"
                      variant="info"
                      className="mx-2 fs-6 fw-bolder text-white"
                    >
                      <BsEye className="fs-4" /> Visualizar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center text-muted">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default VerPedidos;
