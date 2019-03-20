import React from 'react'
import { Mutation } from 'react-apollo'
import { NUEVO_PEDIDO } from '../../mutations'

const validarPedido = (productos, total) => {
  const noValido = !productos || total === 0
  return noValido
}

const enviarNuevoPedido = (nuevoPedido, productos, total, cliente) => {
  const productosInput = productos.map(({ nombre, precio, stock, ...producto }) => producto)
  const input = {
    pedido: productosInput,
    total,
    cliente
  }

  nuevoPedido({ variables: { input } })  
  
}

const GenerarPedido = ({ productos, total, cliente }) => {
  return (
    <Mutation mutation={NUEVO_PEDIDO} onCompleted={() => console.log('okis')}>
      {
        nuevoPedido => (
          <button
            disabled={validarPedido(productos, total)}
            type="button"
            className="btn btn-warning mt-4"
            onClick={() => enviarNuevoPedido(nuevoPedido, productos, total, cliente)}
            >
            Generar Pedido
          </button>
        )
      }
    </Mutation>
  )
}

export default GenerarPedido
