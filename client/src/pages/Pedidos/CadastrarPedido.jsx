// Importação dos componentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

import { useListaProdutos } from "../../hooks/useProdutos";
import { useListaClientes } from "../../hooks/useClientes";

import { useState, useEffect } from "react";

// Importando o hook useForm do react-hook-form
import { useForm } from "react-hook-form";

//Importação do navigate pra transitar entre páginas
//Importação do useParams para pegar o id fornecido na url
import { useNavigate, useParams } from "react-router-dom";

// Importando o hook useInserirProduto
import { useInserirPedido } from "../../hooks/usePedidos";

// Importando o icone de login
import {
  BsBoxes,
  BsCartDash,
  BsCartPlus,
  BsPatchMinus,
  BsPatchPlus,
  BsPeople,
  BsPersonDash,
  BsPersonPlus,
  BsSearch,
} from "react-icons/bs";

const CadastrarPedido = () => {
  // IMPORTAÇÃO E USO DO HOOK FORM
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações
  // o watch é usado para monitorar os campos do formulario
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      desconto: 0,
      formaPagamento: "",
      observacoes: "",
    },
  });

  // Criando o navigate
  const navigate = useNavigate();

  // Lista vinda do hook
  const produtos = useListaProdutos();

  // Estados para filtros
  const [buscaNome, setBuscaNome] = useState("");

  // Filtragem combinada
  const produtosFiltrados = produtos.filter((prod) => {
    const nomeCorresponde = prod.nome
      .toLowerCase()
      .includes(buscaNome.toLowerCase());

    return nomeCorresponde;
  });

  const [listaCarrinho, setListaCarrinho] = useState([]);

  // variavel para armazenar os clientes, que veio do hook
  const clientes = useListaClientes();

  // Estados para filtros
  const [buscaNomeCli, setBuscaNomeCli] = useState("");

  // Filtragem combinada
  const clientesFiltrados = clientes.filter((cli) => {
    const nomeCorresponde =
      cli.nome.toLowerCase().includes(buscaNomeCli.toLowerCase()) ||
      cli.documento.toLowerCase().includes(buscaNomeCli.toLowerCase());

    return nomeCorresponde;
  });

  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  function associarCliente(cliente) {
    setClienteSelecionado(cliente);
  }

  function desassociarCliente() {
    setClienteSelecionado(null);
  }

  useEffect(() => {
    console.log("Lista carrinho atualizada:", listaCarrinho);
  }, [listaCarrinho]);

  function adicionarCarrinho(produto) {
    setListaCarrinho((listaAtual) => {
      const existente = listaAtual.find((p) => p.id === produto.id);

      if (existente) {
        return listaAtual.map((p) =>
          p.id === produto.id
            ? {
                ...p,
                quantidadeSolicitada:
                  p.quantidadeSolicitada < p.quantidadeDisponivel
                    ? p.quantidadeSolicitada + 1
                    : p.quantidadeSolicitada,
              }
            : p
        );
      }
      return [
        ...listaAtual,
        {
          id: produto.id,
          nome: produto.nome,
          SKU: produto.SKU,
          precoVenda: produto.precoVenda,
          quantidadeSolicitada: 1,
          quantidadeDisponivel: produto.quantidade,
        },
      ];
    });
  }

  function aumentarQuantidade(index) {
    setListaCarrinho((listaAtual) =>
      listaAtual.map((item, i) =>
        i === index
          ? {
              ...item,
              quantidadeSolicitada:
                item.quantidadeSolicitada < item.quantidadeDisponivel
                  ? item.quantidadeSolicitada + 1
                  : item.quantidadeSolicitada,
            }
          : item
      )
    );

    console.log(listaCarrinho);
  }

  function diminuirQuantidade(index) {
    setListaCarrinho((listaAtual) =>
      listaAtual.map((item, i) =>
        i === index
          ? {
              ...item,
              quantidadeSolicitada:
                item.quantidadeSolicitada > 1
                  ? item.quantidadeSolicitada - 1
                  : 1,
            }
          : item
      )
    );
  }

  function excluir(index) {
    setListaCarrinho((listaAtual) => listaAtual.filter((_, i) => i !== index));
  }

  const desconto = watch("desconto");
  const formaPagamento = watch("formaPagamento");
  const observacoes = watch("observacoes");

  const subtotal = listaCarrinho.reduce(
    (acc, item) => acc + item.quantidadeSolicitada * item.precoVenda,
    0
  );

  const valorComDesconto = subtotal - subtotal * (desconto / 100);

  useEffect(() => {
    const total = listaCarrinho.reduce((acumulado, item) => {
      const subtotal = item.precoVenda * item.quantidadeSolicitada;
      return acumulado + subtotal;
    }, 0);
  }, [listaCarrinho]);

  const { inserirPedido } = useInserirPedido();

  function fecharPedido() {
    if (listaCarrinho.length === 0) {
      alert("O carrinho não pode estar vazio.");
      return;
    }

    const pedidoJSON = {
      clienteId: clienteSelecionado.id,
      clienteNome: clienteSelecionado.nome,
      data: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString("pt-BR"),
      subtotal: subtotal.toFixed(2),
      desconto: desconto,
      totalFinal: valorComDesconto.toFixed(2),
      formaPagamento: formaPagamento,
      observacoes: observacoes,
      itens: listaCarrinho,
    };   
    inserirPedido(pedidoJSON);
    alert("Pedido Realizado");
    navigate("/pedidos");
    reset();
    setListaCarrinho([]);
    setClienteSelecionado(null);
  }

  return (
    <div className="d-flex flex-column p-3">
      <h1 className="text-center">PDV</h1>
      <Row>
        <Col xl={6} lg={12} >
          <h2 className="text-center">
            <BsBoxes /> Lista de produtos{" "}
          </h2>
          <div className="w-75 mx-auto ">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Procure um produto"
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
              />
              <Button variant="primary" id="botao-filtrar">
                <BsSearch /> Pesquisar
              </Button>
            </InputGroup>
          </div>
          <div
            style={{
              fontSize: "13px",
              minHeight: "300px",
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Marca</th>
                  <th>Tamanho</th>
                  <th>Quantidade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.SKU}</td>
                      <td>{prod.nome}</td>
                      <td>{prod.precoVenda}</td>
                      <td>{prod.marca}</td>
                      <td>
                        {prod.tamanho}
                        {prod.medida}
                      </td>
                      <td>{prod.quantidade}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="success"
                          className="mx-2"
                          onClick={() => adicionarCarrinho(prod)}
                        >
                          <BsCartPlus />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center text-muted">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <h2 className="text-center mt-2">
            <BsPeople /> Lista de Clientes
          </h2>
          <div className="w-75 mx-auto ">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Procure um cliente"
                value={buscaNomeCli}
                onChange={(e) => setBuscaNomeCli(e.target.value)}
              />
              <Button variant="primary" id="botao-filtrar">
                <BsSearch /> Pesquisar
              </Button>
            </InputGroup>
          </div>
          <div
            style={{
              fontSize: "13px",
              minHeight: "200px",
              maxHeight: "200px",
              overflow: "auto",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nome Completo</th>
                  <th>Documento </th>
                  <th>Tipo </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.length > 0 ? (
                  clientesFiltrados.map((cli) => (
                    <tr key={cli.id}>
                      <td>{cli.nome}</td>
                      <td>{cli.documento}</td>
                      <td>{cli.tipo}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="success"
                          className="mx-2"
                          onClick={() => associarCliente(cli)}
                        >
                          <BsPersonPlus />
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
        </Col>

        <Col xl={6} lg={12} className=" bg-success-subtle p-3 mt-1">
          {clienteSelecionado ? (
            <div className="d-flex align-items-center justify-content-between">
              <h2>
                {" "}
                <BsCartPlus /> Carrinho de: {clienteSelecionado.nome}
              </h2>
              <Button size="sm" variant="danger" onClick={desassociarCliente}>
                <BsPersonDash />
              </Button>
            </div>
          ) : (
            <h2>
              <BsCartPlus /> Carrinho sem cliente associado{" "}
            </h2>
          )}

          <div
            style={{
              fontSize: "15px",
              minHeight: "300px",
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            <Table style={{ fontSize: "13px" }}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Item</th>
                  <th>Quantidade</th>
                  <th>Preço final</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {listaCarrinho.length > 0 ? (
                  listaCarrinho.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="d-flex flex-column">
                        <b>{item.nome}</b>
                        <p>Preço unitário: R$ {item.precoVenda}</p>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => diminuirQuantidade(index)}
                        >
                          <BsPatchMinus />
                        </Button>
                        <span className="fs-5 mx-2">
                          {item.quantidadeSolicitada}
                        </span>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => aumentarQuantidade(index)}
                        >
                          <BsPatchPlus />
                        </Button>
                      </td>
                      <td>
                        <p className="fs-5">
                          R${" "}
                          {(
                            item.precoVenda * item.quantidadeSolicitada
                          ).toFixed(2)}{" "}
                        </p>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => excluir(index)}
                        >
                          <BsCartDash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center text-muted">
                      Nenhum produto adicionado no carrinho.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Form
            onSubmit={handleSubmit(fecharPedido)}
            className="mt-3 d-flex flex-wrap flex-row justify-content-between"
          >
            {/* Caixinha de desconto*/}
            <FloatingLabel
              controlId="floatingInputDesconto"
              label="Desconto (%)"
              className="mb-3"
              style={{ width: "50%" }}
            >
              <Form.Control
                type="number"
                min={0}
                max={100}
                {...register("desconto")}
              />
            </FloatingLabel>
            <h4 className="my-auto">R$ Subtotal: {subtotal.toFixed(2)}</h4>
            <FloatingLabel
              label="Forma de pagamento"
              className="mb-3"
              style={{ width: "50%" }}
            >
              <Form.Select {...register("formaPagamento")}>
                <option value="">Selecione</option>
                <option value="Pix">Pix</option>
                <option value="Crédito">Crédito</option>
                <option value="Débito">Débito</option>
                <option value="Dinheiro">Dinheiro</option>
              </Form.Select>
            </FloatingLabel>

            <h3 className="my-auto">Total Final: R$ {valorComDesconto.toFixed(2)}</h3>
            <FloatingLabel
              controlId="floatingObservacoes"
              label="Observações"
              className="w-100 mb-3"
            >
              <Form.Control
                {...register("observacoes")}
                as="textarea"
                placeholder="Observações"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            <Button
              size="lg"
              variant="danger"
              className="h-25 my-auto"
              type="button" // botão comum
              onClick={() => setListaCarrinho([])}
            >
              Limpar carrinho
            </Button>

            <Button
              size="lg"
              variant="success"
              className="h-25 my-auto"
              type="submit" // SUBMITE O FORMULÁRIO
            >
              Fechar pedido
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CadastrarPedido;
