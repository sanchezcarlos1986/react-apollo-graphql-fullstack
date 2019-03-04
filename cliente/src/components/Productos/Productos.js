import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { PRODUCTOS_QUERY } from '../../queries'
import { ELIMINAR_PRODUCTO } from '../../mutations'

import Paginador from '../Paginador'
/**
 * pollInterval dice cada cuántos milisegundos se refrescarán los datos cacheados por Apollo
 */

const handleDelete = (id, eliminarProducto) => {
  eliminarProducto({ variables: { id } })  
}

const limite = 10

export default class Productos extends Component {
  state = {
    paginador: {
      offset: 0,
      actual: 1
    }
  }

  prevPage = () => {
    this.setState({
      paginador: {
        offset: this.state.paginador.offset - limite,
        actual: this.state.paginador.actual - 1
      }
    })
  }

  nextPage = () => {
    this.setState({
      paginador: {
        offset: this.state.paginador.offset + limite,
        actual: this.state.paginador.actual + 1
      }
    })
  }

  render() {
    const { paginador: { actual, offset } } = this.state
    return (
      <Query query={PRODUCTOS_QUERY} variables={{ limite, offset }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error: ${error.message}`

          return (
            <Fragment>
              <h2 className="text-center mt-4">Listado Productos</h2>
              <table className="table">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Eliminar</th>
                    <th scope="col">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.obtenerProductos.map(producto =>
                      <tr key={producto.id}>
                        <td>{producto.nombre}</td>
                        <td>{producto.precio}</td>
                        <td>{producto.stock}</td>
                        <td>
                          <Mutation mutation={ELIMINAR_PRODUCTO}>
                            {eliminarProducto => (
                              <button type="button" className="btn btn-danger d-block d-md-inline-block" style={{ 'marginRight': '10px' }} onClick={() => handleDelete(producto.id, eliminarProducto)}>&times; Eliminar</button>
                            )}
                          </Mutation>
                        </td>
                        <td> <Link to={`/producto/editar/${producto.id}`} className="btn btn-success d-block d-md-inline-block">Editar Producto</Link></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              <Paginador 
                limite={limite} 
                actual={actual} 
                prevPage={this.prevPage} 
                nextPage={this.nextPage} 
                totalClientes={data.totalClientes}
              />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}
