// Importa a url da api do arquivo .env
const url = import.meta.env.VITE_API_URL;

import { useState, useEffect } from "react";



export function useListaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(`${url}/pedidos`);
        const data = await req.json();
        setPedidos(data);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  return pedidos;
}


export function useInserirPedido() {
  const inserirPedido = async (pedido) => {
    const req = await fetch(`${url}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });

    const res = await req.json();
    console.log("Pedido registrado");
    return res;
  };

  return { inserirPedido };
}

export function useBuscarPedidoPorId() {
  const buscarPedidoPorId = async (idPedido) => {
    const req = await fetch(`${url}/pedidos/${idPedido}`);
    const data = await req.json();
    return data;
  };

  return { buscarPedidoPorId };
}

export function useAtualizaPedido() {
  const atualizaPedido = async (pedido, idPedido) => {
    const req = await fetch(`${url}/pedidos/${idPedido}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });

    const res = await req.json();
    console.log("Pedido atualizado");
    return res;
  };

  return { atualizaPedido };
}

export function useDeletaPedido() {
  const deletarPedido = async (idPedido) => {
    const req = await fetch(`${url}/pedidos/${idPedido}`, {
      method: "DELETE",
    });

    const res = await req.json();
    console.log("Pedido deletado");
    return res;
  };

  return { deletarPedido };
}

