import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { CLIENTS_QUERY } from '../queries'

/**
 * pollInterval dice cada cuántos milisegundos se refrescarán los datos cacheados por Apollo
 */

const Clientes = () => (
  <Query query={CLIENTS_QUERY}>
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
                      <Link to={`/cliente/editar/${cliente.id}`} className="btn btn-success d-block d-md-inline-block">Editar Cliente</Link>
                    </div>
                  </div>
                </li>
              )
            }
          </ul>
        </Fragment>
      )
    }}
  </Query>
)

export default Clientes