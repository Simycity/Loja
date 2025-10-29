// url da API
const url = "http://localhost:5000";

// importando hook de useState para controlar as variáveis
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../contexts/UserContext";

export function useVerificaLogin() {

    const {login} = useContext(AuthContext);
    // Variável para armazenar a lista de usuários
    const [usuarios, setUsuarios] = useState([]);

    // Usando o useEffect para criar a lista de usuários, assim que o componente é renderizado na tela
    useEffect(() => {
            
        // Função para buscar dados da API
        async function fetchData() {

            try {
                // Variável para realizar requisição
                const req = await fetch(`${url}/usuarios`);

                // Conversão do retorno (req) para json
                const res = await req.json();

                // Pega a resposta e guarda na variável de usuários
                setUsuarios(res);
                
            } catch (error) {
                console.log(error.message);
            }
        }
        
        fetchData();

    }, []);

    // Função pra verificar se o usuário passado existe na lista que da API
    const verificaLogin = (data) => {


        const userToFind = usuarios.find( (user) => {
            // Verifica se há um usuário com email passado em data, na lista que buscou da API
            return user.email === data.email;
        }) 

        // Verifica se o usuário existe, verifica se a senha está correta
        if(userToFind != undefined && userToFind.senha == data.senha){
            console.log("Usuário logado: ", userToFind.nome);
            // Passa o usuário logado para o contexto
            login(userToFind);
            return "Login efetuado com sucesso";

        } 
        // Caso o usuário exista ou senha esteja errada, retorna mensagem de erro
        else {
            return "Usuário ou senha inválidos!";
        }
    }
        
    return { verificaLogin };

}

