import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'

import { CLIENT_QUERY } from '../../queries'
import FormularioEditarCliente from './FormularioEditarCliente'

export default class EditarCliente extends Component {
  render() {
    const { match: { params: { id } } } = this.props
    return (
      <Fragment>
        <h2 className="text-center">EditarCliente</h2>
        <div className="row justify-content-center">
          <Query query={CLIENT_QUERY} variables={{ id }}>
            {({ loading, error, data }) => {         
              if (loading) return 'Loading...'
              if (error) return `Error: ${error.message}`
              return (
                <FormularioEditarCliente
                  cliente={data.getCliente}
                />
              )
            }}
          </Query>
        </div>
      </Fragment>
    )
  }
}
