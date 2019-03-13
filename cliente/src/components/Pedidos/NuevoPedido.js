import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'

import { PRODUCTOS_QUERY } from '../../queries'
import DatosCliente from './DatosCliente'
import ContenidoPedido from './ContenidoPedido'
import Loader from '../Loader'


export default class NuevoPedido extends Component {


  render() {
    const { match: { params: { id } } } = this.props
    return (
      <Fragment>
        <h1 className="text-center mb-5">NuevoPedido</h1>
        <div className="row">
          <div className="col-md-3">
            <DatosCliente id={id} />
          </div>
          <div className="col-md-9">
            <Query query={PRODUCTOS_QUERY} variables={{ id }}>
              {({ loading, error, data }) => {
                if (loading) return <Loader />
                if (error) return `Error: ${error.message}`

                return (
                  <ContenidoPedido
                    productos={data.obtenerProductos}
                    id={id}
                   />
                )
              }}
            </Query>
          </div>
        </div>
      </Fragment>
    )
  }
}
