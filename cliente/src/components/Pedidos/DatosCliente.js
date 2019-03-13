import React, { Fragment } from 'react'
import { Query } from 'react-apollo'

import Loader from '../Loader'
import { CLIENT_QUERY } from '../../queries'

const DatosCliente = ({ id }) => {
  return (
    <Fragment>
      <h2 className="text-center mb-3">Resumen de Cliente</h2>
      <Query query={CLIENT_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />
          if (error) return `Error: ${error.message}`

          const { nombre, apellido, edad, emails, empresa, tipo } = data.getCliente

          return (
            <ul className="list-unstyled my-5">
              <li className="border font-weight-bold p-2">Nombre:
                <span className="font-weight-normal"> {nombre}</span>
              </li>
              <li className="border font-weight-bold p-2">Apellido:
                <span className="font-weight-normal"> {apellido}</span>
              </li>
              <li className="border font-weight-bold p-2">Edad:
                <span className="font-weight-normal"> {edad}</span>
              </li>
              <li className="border font-weight-bold p-2">emails:
                <span className="font-weight-normal"> {emails.map(email => ` ${email.email}`)}</span>
              </li>
              <li className="border font-weight-bold p-2">Empresa:
                <span className="font-weight-normal"> {empresa}</span>
              </li>
              <li className="border font-weight-bold p-2">Tipo:
                <span className="font-weight-normal"> {tipo}</span>
              </li>
            </ul>
          )
        }}
      </Query>
    </Fragment>
  )
}

export default DatosCliente