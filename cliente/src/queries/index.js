import gql from 'graphql-tag'

export const CLIENTS_QUERY = gql`
  query {
    getClientes {
      id
      nombre
      apellido
      empresa
      emails {
        email
      }
      edad
      tipo
    }
  }
`

export const CLIENT_QUERY = gql`
  query ConsultarClientes($id: ID){
    getCliente(id: $id) {
      id
      nombre
      apellido
      empresa
      emails {
        email
      }
      edad
      tipo
    }
  }
`