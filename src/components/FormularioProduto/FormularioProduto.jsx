// Importação dos componentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Importando a função useform do pacote hook-form
import { useForm } from "react-hook-form";

const FormularioProduto = (props) => {
  // register = cria um objeto com os valores retirados dos inputs
  // handleSumbit = envia os dados formulário, caso dê erro ou sucesso
  // formState { errors } = objeto que guarda uma lista de erros que aconteceram na tentativa do envio
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={""}>
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
          <Col md={12} lg={6}></Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormularioProduto;
