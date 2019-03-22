import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { OBTENER_PEDIDOS } from '../../queries'

import Loader from '../Loader'
import Pedido from './Pedido'

const PedidosCliente = ({ match }) => {
  const cliente = match.params.id

  return (
    <Fragment>
      <h1 className="text-center mb-5">Pedidos del Cliente</h1>
      <div className="row">
        <Query query={OBTENER_PEDIDOS} variables={{ cliente }}>
          {({ loading, error, data }) => {
              if (loading) return <Loader />
              if (error) return `Error: ${error.message}`
              return (
                data.obtenerPedidos.map(pedidos => <Pedido key={pedidos.id} pedidos={pedidos} />)
              )
            }
          }
        </Query>
      </div>
    </Fragment>
  )
}

export default PedidosCliente