/* eslint-disable no-dupe-keys */
// url da API
const url = "http://localhost:5000";

// importando hook de useState para controlar as variáveis
import { useState, useEffect } from "react";

export function useListaCategorias() {
  // Variável para armazenar as categorias
  const [categorias, setCategorias] = useState([]);

  // Puxa od dados da API assim que o componente é iniciado
  useEffect(() => {
    async function fetchCategorias() {
      try {
        // Fetch abre a conexão com a api, na rota especificada e guarda a resposta em req
        const req = await fetch(`${url}/categorias`);

        // Como a resposta vem em texto,preciso converter em .json para utilizar
        const res = await req.json();

        // Assim que estiver convertido, guarda na variável criada para guardar as categorias
        setCategorias(res);

        // Setiver erro na tentativa de conexão com api, mostrar qual foi no console
      } catch (erro) {
        console.log(erro.message);
      }
    }

    // Executa a função de buscar as categorias na api
    fetchCategorias();
  }, []);

  // retorna para quem chamou a função, a lista de categorias já preenchida.
  return categorias;
}

export function useListaMedidas() {
  // Lista com medida
  const [medidas] = useState([
    {
      id: 1,
      nome: "mL",
      
    },
    {
        id: 2,
        nome:  "L"
    }
  ]);
  return medidas;
}
