import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

// importacao do hook para buscar os clientes
import { useBuscarPedidoPorId } from "../../hooks/usePedidos";

//Importação do navigate pra transitar entre páginas
//Importação do useParams para pegar o id fornecido na url
import { Link, useParams } from "react-router-dom";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const VisualizarPedido = () => {
  // Guardando o id do produto vindo da url
  const { id } = useParams();

  // variavel para armazenar os clientes, que veio do hook
  const { buscarPedidoPorId } = useBuscarPedidoPorId(id);

  const [pedidoAtual, setPedidoAtual] = useState("");

  const [listaProdutos, setListaProdutos] = useState([]);
  useEffect(() => {
    async function fetchPedido() {
      try {
        const pedido = await buscarPedidoPorId(id);
        setPedidoAtual(pedido);
        setListaProdutos(pedido.itens);
      } catch (erro) {
        console.error("Erro ao buscar pedido:", erro);
        // Se o erro for de produto não encontrado, redireciona para a página inicial
        if (erro.message.includes("Unexpected")) {
          alert("Produto não encontrado!");
          navigate("/home");
        }
      }
    }
    fetchPedido();
  }, []);

  console.log(pedidoAtual);
  console.log(listaProdutos);

  return (
    <div className="fs-4">
      <Button
        as={Link}
        to={`/pedidos`}
        size="md"
        variant="primary"
        className=" d-block float-end"
      >
        <BsFillArrowLeftCircleFill /> Voltar para pedidos
      </Button>

      <h2>Informações Gerais</h2>

      <Table striped bordered variant="dark">
        <tbody>
          <tr>
            <td colSpan={4}>
              <p>
                <b>Id do pedido:</b> {pedidoAtual.id}
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <p>
                <b>Nome do cliente:</b> {pedidoAtual.clienteNome}
              </p>
            </td>
            <td colSpan={2}>
              <p>
                <b>Forma de pagamento:</b> {pedidoAtual.formaPagamento}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Data:</b>{" "}
                {pedidoAtual?.data
                  ? pedidoAtual.data.split("T")[0].split("-").reverse().join("/")
                  : "Carregando..."}
              </p>
            </td>
            <td>
              <p>
                <b>Hora:</b> {pedidoAtual.hora}
              </p>
            </td>
            <td>
              <p>
                <b>Total do pedido:</b> {pedidoAtual.totalFinal}
              </p>
            </td>
            <td>
              <p>
                <b>Desconto:</b> {pedidoAtual.desconto}%
              </p>
            </td>
          </tr>
        </tbody>
      </Table>

      <FloatingLabel
        controlId="floatingObservacoes"
        label="Observações"
        className="w-100 mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Observações"
          className="fs-5"
          style={{
            minHeight: "100px",
            maxHeight: "100px",
            overflow: "auto",
          }}
          defaultValue={pedidoAtual.observacoes}
        />
      </FloatingLabel>

      <h2 className="mt-2">Lista de itens</h2>
      <Table
        striped
        bordered
        hover
        style={{
          fontSize: "20px",
          minHeight: "300px",
          maxHeight: "300px",
          overflow: "auto",
        }}
      >
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nome</th>
            <th>Preço unitário</th>
            <th>Quantidade</th>
            <th>Preço final</th>
          </tr>
        </thead>
        <tbody>
          {listaProdutos.map((item) => (
            <tr key={item.id}>
              <td>{item.SKU}</td>
              <td>{item.nome}</td>
              <td>{item.precoVenda}</td>
              <td>{item.quantidadeSolicitada}</td>
              <td>
                <p className="">
                  R$ {(item.precoVenda * item.quantidadeSolicitada).toFixed(2)}{" "}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VisualizarPedido;
