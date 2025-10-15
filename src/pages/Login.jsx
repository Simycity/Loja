// Importação dos componentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

// Importação do ícone de login
import { SiRiotgames } from "react-icons/si";

// Importando hook para verificar o login, vindo de useUsuarios
import { useVerificaLogin } from "../hooks/useUsusarios";

// Importandoa função useForm para verificar do pacote hook-form
import { useForm } from "react-hook-form";

// Importa useState para tratar de variáveis
import { useState } from 'react';

// Importação do Navigate para transitar entre as páginas
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // register = cria um objeto com os valores retirados dos inputs
  // handleSubmit = envia os dados formulário, caso dê erro ou sucesso
  // formState {errors} = objeto que guarda uma lista de erros que aconteceram na tentativa do envio
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Variavel para tratar a classe do alerta
  const [alertaClasse, setAlertaClasse] = useState("d-none");

  // Usando apenas a função verificaLogin, que importei do hook
  const { verificaLogin } = useVerificaLogin()

  const navigate = useNavigate();

  // Caso o envio dê certo
  // data = um objeto com todas as informações preenchidas nos campos do formulário
  const onSubmit = (data) => {
    console.log("Dados enviados:", data);

    // Cria uma variável para armazenar a resposta completa que veio da função
    const resposta = verificaLogin(data);

    if(resposta === "Login efetuado com sucesso"){
      alert(resposta)
      navigate("/home");
    } else {
      setAlertaClasse("my-3 w-75 mx-auto");
    }
  };

  // Caso o envio dê certo
  // errors = um objeto com todos os erros do envio
  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <Container className="justify-content-center align-content-center min-vh-100">
      {/* Linhas para os campos de login e ícone */}
      <Row className="bg-success">
        {/* Coluna com ícone da página */}
        <Col>
          {/* Ícone de Login */}
          <SiRiotgames style={{ fontSize: "500px", color: "red" }} />
        </Col>

        {/* Coluna com os campos de login */}
        <Col className="d-flex flex-column">
          <Form 
          style={{ width: "75%", margin: "auto", textAlign: "center" }}
          // Utilizar o evento onSubmit para envio do formulário e o handleSubmit vindo do hookForm
          onSubmit={handleSubmit( onSubmit, onError)}>

            {/* Caixinha de Email */}
            <FloatingLabel
              controlId="inputEmail"
              label="Digite seu Email"
              className="mb-5"
            >
              <Form.Control 
                type="email"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                    message: "Email inválido"
                  },
                  validate: (value) => value.includes("@") || "O email deve posuir um @"
                })}/>
                {errors.email && (<p>{errors.email.message}</p>)}
              {/* Fim da caixinha de email */}

            </FloatingLabel>
            {/* Fim da caixinha de Email */}

            {/* Caixinha de Senha */}
            <FloatingLabel
              controlId="inputSenha"
              label="Senha"
              className="mb-5"
            >
              <Form.Control 
              type="password" 
                {...register("senha", {
                    required: "A senha é obrigatória"
                  })}
              />
              {errors.senha && (<p className="error">{errors.senha.message}</p>)}
            </FloatingLabel>
            {/* Fim da caixinha de Senha */}

            {/* Botão para envio */}
            <Button variant="primary" type="submit" className="mb-5" size="lg">
              Login
            </Button>

            {/* Alerta, caso haja algum erro*/}
            {/* <Alert variant="danger" className="my-3 w-75 mx-auto"> */}
            <Alert variant="danger" className={alertaClasse}>
              Email ou senha inválidos!
            </Alert>
            {/* Fim do alerta de email ou senha inválidos */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
