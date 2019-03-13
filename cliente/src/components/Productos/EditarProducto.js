import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'

import Loader from '../Loader'

import { PRODUCTO_QUERY } from '../../queries'
import FormularioEditarProducto from './FormularioEditarProducto'

export default class EditarProducto extends Component {
  render() {
    const { match: { params: { id } } } = this.props
    return (
      <Fragment>
        <h2 className="text-center">Editar Producto</h2>
        <div className="row justify-content-center">
          <Query query={PRODUCTO_QUERY} variables={{ id }}>
            {({ loading, error, data, refetch }) => {         
              if (loading) return <Loader />
              if (error) return `Error: ${error.message}`
              return (
                <FormularioEditarProducto
                  producto={data.obtenerProducto}
                  refetch={refetch}
                />
              )
            }}
          </Query>
        </div>
      </Fragment>
    )
  }
}
