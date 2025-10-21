// Importando hook de criar o contexto
import{ createContext, useEffect, useState } from "react";

// Criando o contexto de autorização
export const AuthContext = createContext();

// Cria Provider do contexto
// Provider = fronece as informações para os componentes filhos
export const AuthProvider = ( { children } ) => {

    // State para guardar o nome do usuário logado no momento
    const [usuarioNome, setUsuarioNome] = useState("");

    // Quando o componente é renderizado, buscal no localStorage o usuário atual, se não tiver nenhum define como Visitante
    useEffect(() => {
        const nomeAtual = localStorage.getItem("userName") || "Visitante";
        setUsuarioNome(nomeAtual);
    }, []);

    // Função pra receber as informações de login, e guardar no localStorage
    const login = (data) => {
        console.log("Usuário Logado: ", data);

        localStorage.setItem("id", data.id);
        localStorage.setItem("userName", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("imagemPerfil", data.imagemUrl);
        setUsuarioNome(data.nome)
    }

    // Função para remover as informações login do localStorage e redefinir o nome de usuário para Visitante
    const logout = () => {
        localStorage.clear();
        setUsuarioNome("Visitante");
    }
    
    // Retorna o provider com os dados do usuário, login e logout
    return(
        <AuthContext.Provider value = { {usuarioNome, login, logout} }>
            { children }
        </AuthContext.Provider>
    )
}