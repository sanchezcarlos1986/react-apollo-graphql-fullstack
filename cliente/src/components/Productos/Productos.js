import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { PRODUCTOS_QUERY } from '../../queries'
import { ELIMINAR_PRODUCTO } from '../../mutations'

import Paginador from '../Paginador'
import Loader from '../Loader'
/**
 * pollInterval dice cada cuántos milisegundos se refrescarán los datos cacheados por Apollo
 */

const handleDelete = (id, eliminarProducto) => {
  eliminarProducto({ variables: { id } })  
}

const limite = 5

export default class Productos extends Component {
  state = {
    paginador: {
      offset: 0,
      actual: 1
    },
    message: ''
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
    const { message, paginador: { actual, offset } } = this.state
    return (
      <Query query={PRODUCTOS_QUERY} variables={{ limite, offset }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />
          if (error) return `Error: ${error.message}`

          return (
            <Fragment>
              <h2 className="text-center mt-4">Listado Productos</h2>
              {
                message && 
                <p className="alert alert-success py-3 text-center my-3">{message}</p>
              }
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
                    data.obtenerProductos.map(producto => {
                      const { stock } = producto

                      let clase = ''

                      if (stock > 51 && stock < 100) clase = 'table-warning'
                      if (stock < 50) clase = 'table-danger text-light'

                      return <tr key={producto.id} className={clase}>
                        <td>{producto.nombre}</td>
                        <td>{producto.precio}</td>
                        <td>{producto.stock}</td>
                        <td>
                          <Mutation
                            mutation={ELIMINAR_PRODUCTO}
                            onCompleted={data => {
                              this.setState({
                                message: data.eliminarProducto
                              }, () => {
                                setTimeout(() => {
                                  this.setState({ message: '' })
                                }, 2000);
                              })
                            }}
                          >
                            {
                              eliminarProducto => (
                                <button type="button" className="btn btn-danger d-block d-md-inline-block" style={{ 'marginRight': '10px' }} onClick={() => handleDelete(producto.id, eliminarProducto)}>&times; Eliminar</button>
                              )}
                          </Mutation>
                        </td>
                        <td> <Link to={`/productos/editar/${producto.id}`} className="btn btn-success d-block d-md-inline-block">Editar Producto</Link></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
              <Paginador 
                limite={limite} 
                actual={actual} 
                prevPage={this.prevPage} 
                nextPage={this.nextPage} 
                total={data.totalProductos}
              />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}
