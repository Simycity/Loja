// Importação dos componentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Importando a função useform do pacote hook-form
import { useForm } from "react-hook-form";

// Importando hook produtos
import {
  useListaCategorias,
  useListaMedidas,
  useInserirProduto,
} from "../../hooks/useProdutos";

const FormularioProduto = (props) => {
  // IMPORTAÇÃO DAS FUNÇÕES VINDAS DO HOOK USEPRODUTOS
  // Usando a função de inserir produto

  const { inserirProduto } = useInserirProduto();

  // register = cria um objeto com os valores retirados dos inputs
  // handleSumbit = envia os dados formulário, caso dê erro ou sucesso
  // formState { errors } = objeto que guarda uma lista de erros que aconteceram na tentativa do envio
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  // Lista de categorias
  const cates = useListaCategorias();
  console.log(cates);
  
  // Lista de medidas
  const medis = useListaMedidas();
  console.log(medis);

  // Criando variável para produo sem imagem
  const linkImagem = "https://www.sdlgpecas.com/assets/produto_sem_foto.png";

  // Variável que armazena o link da imagem, vindo do input
  const imagemAtual = watch("imagemUrl");

  // FUNÇÕES QUE LIDAM COM SUCESSO OU ERRRO DO FORMULÁRIO
  // Função pra caso dê certo na validação do formulário
  // data => objeto com as informações dos campos do formulário

  const onSubmit = (data) => {
    console.log("Dados:", data);
    if (props.page === "cadastro") {
      // Envia o objeto data para o hook inserir produto
      inserirProduto(data);
      alert("Produto cadastrado com sucesso");
    } else {
      // Depois nois vê
    }
  };

  // Caso tenha algum erro do formulário, mostra as mensagens de erro dos campos
  const onError = (errors) => {
    console.log("Errors:", errors);
    
  };

  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <Col md={12} lg={6}>
            {/* Caixinha de SKU */}
            <FloatingLabel controlId="FI-SKU" label="SKU" className="mb-5">
              <Form.Control
                type="text"
                {...register("sku", {
                  required: "O SKU é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O SKU deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 10,
                    message: "O SKU deve ter no máximo 10 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.sku && <p className="error"> {errors.sku.message} </p>}
            </FloatingLabel>
            {/* Fim de caixinha de SKU */}

            {/* Caixinha de Nome */}
            <FloatingLabel controlId="FI-NOME" label="Nome" className="mb-5">
              <Form.Control
                type="text"
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O nome deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "O nome deve ter no máximo 30 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.nome && <p className="error"> {errors.nome.message} </p>}
            </FloatingLabel>
            {/* Fim de caixinha de Nome */}

            {/* Caixinha de descrição */}
            <FloatingLabel
              controlId="FI-DESCRICAO"
              label="Descrição"
              className="mb-5"
            >
              <Form.Control
                type="text"
                {...register("descricao", {
                  required: "A descrição é obrigatória",
                  minLength: {
                    value: 2,
                    message: "A descrição deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "A descrição deve ter no máximo 100 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.descricao && (
                <p className="error"> {errors.descricao.message} </p>
              )}
            </FloatingLabel>
            {/* Fim de caixinha de descrição */}

            {/* Caixinha de categoria */}
            <FloatingLabel
              controlId="FI-CATEGORIAS"
              label="Categoria"
              className="mb-5"
            >
              <Form.Select
                {...register("categoria", {
                  validate: (value) => value !== "0" || "Escolha uma Categoria",
                })}
              >
                <option value="0">Escolha uma categoria</option>
                <option value="1">Escolha outra categoria</option>
                {cates.map((cat) => {
                  <option key={cat.id} value={cat.nome}>
                    {cat.nome}
                  </option>;
                })}
              </Form.Select>
              {errors.categoria && (
                <p className="error"> {errors.categoria.message} </p>
              )}
            </FloatingLabel>
            {/* Fim de caixinha de categoria */}

            {/* Caixinha de marca */}
            <FloatingLabel controlId="FI-MARCA" label="Marca" className="mb-5">
              <Form.Control
                type="text"
                {...register("marca", {
                  required: "A marca é obrigatória",
                  minLength: {
                    value: 2,
                    message: "A marca deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "A marca deve ter no máximo 30 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.marca && (
                <p className="error"> {errors.marca.message} </p>
              )}
            </FloatingLabel>
            {/* Fim de caixinha de marca */}

            {/* Caixinha de fornecedor */}
            <FloatingLabel
              controlId="FI-FORNECEDOR"
              label="Fornecedor"
              className="mb-5"
            >
              <Form.Control
                type="text"
                {...register("fornecedor", {
                  required: "O Fornecedor é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O Fornecedor deve ter pelo menos dois caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "O Fornecedor deve ter no máximo 30 caracteres",
                  },
                })}
              ></Form.Control>
              {errors.fornecedor && (
                <p className="error"> {errors.fornecedor.message} </p>
              )}
            </FloatingLabel>
            {/* Fim de caixinha de fornecedor */}
          </Col>

          {/* Segunda Coluna */}
          <Col md={12} lg={6}>
            {/* Caixinha de quantidade */}
            <FloatingLabel
              controlId="FI-QUANTIDADE "
              label="Quantidade"
              className="mb-5"
            >
              <Form.Control
                type="number"
                {...register("quantidade", {
                  required: "A Quantidade é obrigatório",
                  min: {
                    value: 1,
                    message: "A quantidade deve ser maior que 0(zero)",
                  },
                })}
              ></Form.Control>
              {errors.quantidade && (
                <p className="error"> {errors.quantidade.message} </p>
              )}
            </FloatingLabel>
            {/* Fim de caixinha de quantidade */}

            <Row>
              {" "}
              {/* PRIMEIRA LINHA */}
              <Col>
                {" "}
                {/* PRIMEIRA COLUNA */}
                {/* Caixa de tamanho */}
                <FloatingLabel
                  controlId="FI-TAMANHO"
                  label="Tamanho"
                  className="mb-5"
                >
                  <Form.Control
                    type="number"
                    {...register("tamanho", {
                      required: "O tamanho é Obrigatório",
                      min: {
                        value: 1,
                        message: "O tamanho deve ser maior que 0 (zero)",
                      },
                    })}
                  >
                  </Form.Control>
                    {errors.tamanho && (
                      <p className="error"> {errors.tamanho.message} </p>
                    )}
                </FloatingLabel>
              </Col>
              {/* Fim da caixa de tamanho */}
              {/* Caixinha de medidas */}
              <Col>
                <FloatingLabel
                  controlId="FI-MEDIDAS"
                  label="Medidas"
                  className="mb-5"
                >
                  <Form.Select
                    {...register("medidas", {
                      validate: (value) =>
                        value !== "0" || "Escolha uma medida",
                    })}
                  >
                    <option value="0">Escolha uma medida</option>
                    <option value="1">L</option>
                    {medis.map((med) => {
                      <option key={med.id} value={med.nome}>
                        {med.nome}
                      </option>;
                    })}
                  </Form.Select>
                  {errors.medidas && (
                    <p className="error"> {errors.medidas.message} </p>
                  )}
                </FloatingLabel>
              </Col>
              {/* Fim de caixinha de medidas */}
            </Row>

            <Row>
              {" "}
              {/* SEGUNDA LINHA */}
              {/* Caixa de Preço de Custo */}
              <Col>
                <FloatingLabel
                  controlId="FI-PC"
                  label="Preço de custo"
                  className="mb-5"
                >
                  <Form.Control
                    type="number"
                    {...register("precoCusto", {
                      required: "O preço de custo é Obrigatório",
                      min: {
                        value: 0.01,
                        message: "O preço de custo deve ser maior que 0 (zero)",
                      },
                    })}
                  >
                  </Form.Control>
                    {errors.precoCusto && (
                      <p className="error"> {errors.precoCusto.message} </p>
                    )}
                </FloatingLabel>
              </Col>
              {/* Fim da Caixa de Preço de Custo */}
              {/* Caixa de Preço de Venda */}
              <Col>
                <FloatingLabel
                  controlId="FI-PV"
                  label="Preço de venda"
                  className="mb-5"
                >
                  <Form.Control
                    type="number"
                    {...register("precoVenda", {
                      required: "O preço de venda é Obrigatório",
                      min: {
                        value: 0.01,
                        message: "O preço de venda deve ser maior que 0 (zero)",
                      },
                    })}
                  >
                  </Form.Control>
                    {errors.precoVenda && (
                      <p className="error"> {errors.precoVenda.message} </p>
                    )}
                </FloatingLabel>
              </Col>
              {/* Fim da Caixa de Preço de Venda */}
            </Row>

            {/* Caixa de Imagem */}
            <Form.Group controlId="FI-IMAGEM" className="mb-5">
              <FloatingLabel
                controlId="FI-IMAGEM"
                className="mb-5"
                label="Link da Imagem"
              >
                <Form.Control
                  type="url"
                  {...register("imagemUrl", {
                    required: "O link é obrigatório",
                    pattern: {
                      value: /^(http|https):\/\/[^ "]+$/,
                      message: "Insira um link válido",
                    },
                  })}
                ></Form.Control>
                {errors.imagemUrl && (
                  <p className="error"> {errors.imagemUrl.message} </p>
                )}
              </FloatingLabel>
              <Image
                width={200}
                height={200}
                rounded
                src={imagemAtual == "" ? linkImagem : imagemAtual}
              />
            </Form.Group>
            {/* Fim da Caixa de Imagem */}
          </Col>
        </Row>

        {/* Crição do botão do envio do formulário */}
        <Button variant="primary" size="lg" type="submit">
          {props.page === "editar" ? "Atualizar" : "Cadastrar"}
        </Button>
      </Form>
    </div>
  );
};

export default FormularioProduto;
