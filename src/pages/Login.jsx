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

const Login = () => {

  // register = cria um objeto com os valores retirados dos inputs
  // handleSubmit = envia os dados formulário, caso dê erro ou sucesso
  // formState {errors} = objeto que guarda uma lista de erros que aconteceram na tentativa do envio
  const { register, handleSubmit, formState: {errors} } = useForm()

  // Caso o envio dê certo
  // data = um objeto com todas as informações preenchidas nos campos do formulário
  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
    
  }

  // Caso o envio dê certo
   // errors = um objeto com todos os erros do envio
  const onError = (errors) => {
    console.log("Erros:", errors);
    
  }



  return (
    <Container className="justify-content-center align-content-center min-vh-100">
      {/* Linhas para os campos de login e ícone */}
      <Row className="bg-black">
        {/* Coluna com ícone da página */}
        <Col>
        {/* Ícone de Login */}
          <SiRiotgames style={{fontSize:"500px", color:"red"}}/>
        </Col>

        {/* Coluna com os campos de login */}
        <Col className="d-flex flex-column">
          <Form style={{ with:"75%", margin: "auto", textAlign: "center" }}>
            {/* Caixinha de Email */}
            <FloatingLabel
              controlId="inputEmail"
              label="Digite seu Email"
              className="mb-5"
            >
              <Form.Control type="email" />
            </FloatingLabel>
            {/* Fim da caixinha de Email */}

            {/* Caixinha de Senha */}
            <FloatingLabel
              controlId="inputSenha"
              label="Senha"
              className="mb-5"
            >
              <Form.Control type="password" />
            </FloatingLabel>
            {/* Fim da caixinha de Senha */}

            {/* Botão para envio */}
            <Button variant="primary" type="submit" className="mb-5" size="lg">
              Login
            </Button>

            {/* Alerta de Erro */}
            <Alert variant="danger" className="my-3 w-75 mx-auto">
              Usuario ou senha estão inválidos
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
