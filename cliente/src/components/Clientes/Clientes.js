import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { CLIENTS_QUERY } from '../../queries'
import { ELIMINAR_CLIENTE } from '../../mutations'

import Paginador from '../Paginador'
/**
 * pollInterval dice cada cuántos milisegundos se refrescarán los datos cacheados por Apollo
 */

const handleDelete = (id, eliminarCliente) => {
  eliminarCliente({ variables: { id } })  
}

const limite = 2

export default class Clientes extends Component {
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
      <Query query={CLIENTS_QUERY} variables={{ limite, offset }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error: ${error.message}`

          return (
            <Fragment>
              <h2 className="text-center mt-4">Listado Clientes</h2>
              <ul className="list-group mt-4">
                {
                  data.getClientes.map(cliente =>
                    <li className="list-group-item" key={cliente.id}>
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                          <span><strong>{cliente.nombre} {cliente.apellido}</strong> - <i>{cliente.email}</i> - {cliente.empresa}</span>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                          <Mutation mutation={ELIMINAR_CLIENTE}>
                            {eliminarCliente => (
                              <button type="button" className="btn btn-danger d-block d-md-inline-block" style={{ 'marginRight': '10px' }} onClick={() => handleDelete(cliente.id, eliminarCliente)}>&times; Eliminar</button>
                            )}
                          </Mutation>
                          <Link to={`/cliente/editar/${cliente.id}`} className="btn btn-success d-block d-md-inline-block">Editar Cliente</Link>
                        </div>
                      </div>
                    </li>
                  )
                }
              </ul>
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
