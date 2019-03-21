import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { OBTENER_PEDIDOS } from '../../queries'

import Loader from '../Loader'

const PedidosCliente = ({ match }) => {
  const cliente = match.params.id

  return (
    <Fragment>
      <h1 className="text-center mb-5">Pedidos del Cliente</h1>
      <div className="row">
        <Query query={OBTENER_PEDIDOS} variables={{ cliente }}>
          {({ loading, error, data }) => {
              console.log('data:', data.obtenerPedidos)
              if (loading) return <Loader />
              if (error) return `Error: ${error.message}`
              return (
                <p>hola</p>
              )
            }
          }
        </Query>
      </div>
    </Fragment>
  )
}

export default PedidosCliente